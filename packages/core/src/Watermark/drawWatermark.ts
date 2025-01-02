import type { WatermarkProps } from ".";

export const FontGap = 3;

function prepareCanvas(
	width: number,
	height: number,
	ratio = 1,
): [
	ctx: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	realWidth: number,
	realHeight: number,
] {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	const realWidth = width * ratio;
	const realHeight = height * ratio;
	canvas.setAttribute("width", `${realWidth}px`);
	canvas.setAttribute("height", `${realHeight}px`);
	ctx.save();

	return [ctx, canvas, realWidth, realHeight];
}

/**
 * Get the clips of text content.
 */
export function drawWatermark(
	content: NonNullable<WatermarkProps["text"]> | HTMLImageElement,
	rotate: number,
	ratio: number,
	width: number,
	height: number,
	font: Required<NonNullable<WatermarkProps["font"]>>,
	fillColor: CanvasFillStrokeStyles["fillStyle"],
	gapX: number,
	gapY: number,
): [dataURL: string, finalWidth: number, finalHeight: number] {
	// ================= Text / Image =================
	const [ctx, canvas, canvasWidth, canvasHeight] = prepareCanvas(
		width,
		height,
		ratio,
	);

	if (content instanceof HTMLImageElement) {
		// Image
		ctx.drawImage(content, 0, 0, canvasWidth, canvasHeight);
	} else {
		// Text
		const { fontSize, fontStyle, fontWeight, fontFamily } = font;
		const mergedFontSize = Number(fontSize) * ratio;

		ctx.font = `${fontStyle} ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
		ctx.fillStyle = fillColor;
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		const contents = Array.isArray(content) ? content : [content];
		contents?.forEach((item, index) => {
			ctx.fillText(
				item ?? "",
				canvasWidth / 2,
				index * (mergedFontSize + FontGap * ratio) + 6,
			);
		});
	}

	// ==================== Rotate ====================
	const angle = (Math.PI / 180) * Number(rotate);
	const maxSize = Math.max(width, height) + 6;
	const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);

	// Copy from `ctx` and rotate
	rCtx.translate(realMaxSize / 2, realMaxSize / 2);
	rCtx.rotate(angle);
	if (canvasWidth > 0 && canvasHeight > 0) {
		rCtx.drawImage(canvas, -canvasWidth / 2, -canvasHeight / 2);
	}

	// Get boundary of rotated text
	function getRotatePos(x: number, y: number) {
		const targetX = x * Math.cos(angle) - y * Math.sin(angle);
		const targetY = x * Math.sin(angle) + y * Math.cos(angle);
		return [targetX, targetY];
	}

	let left = 0;
	let right = 0;
	let top = 0;
	let bottom = 0;

	const halfWidth = canvasWidth / 2;
	const halfHeight = canvasHeight / 2;
	const points = [
		[0 - halfWidth, 0 - halfHeight],
		[0 + halfWidth, 0 - halfHeight],
		[0 + halfWidth, 0 + halfHeight],
		[0 - halfWidth, 0 + halfHeight],
	];
	points.forEach(([x, y]) => {
		const [targetX, targetY] = getRotatePos(x, y);
		left = Math.min(left, targetX);
		right = Math.max(right, targetX);
		top = Math.min(top, targetY);
		bottom = Math.max(bottom, targetY);
	});

	const cutLeft = left + realMaxSize / 2;
	const cutTop = top + realMaxSize / 2;
	const cutWidth = right - left;
	const cutHeight = bottom - top;

	// ================ Fill Alternate ================
	const realGapX = gapX * ratio;
	const realGapY = gapY * ratio;
	const filledWidth = (cutWidth + realGapX) * 2;
	const filledHeight = cutHeight + realGapY;

	const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);

	function drawImg(targetX = 0, targetY = 0) {
		fCtx.drawImage(
			rCanvas,
			cutLeft,
			cutTop,
			cutWidth,
			cutHeight,
			targetX,
			targetY,
			cutWidth,
			cutHeight,
		);
	}
	drawImg();
	drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
	drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);

	return [fCanvas.toDataURL(), filledWidth / ratio, filledHeight / ratio];
}
