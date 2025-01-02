import * as React from "react";

function toLowercaseSeparator(key: string) {
	return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function getStyleStr(style: React.CSSProperties): string {
	return Object.keys(style)
		.map(
			(key) =>
				`${toLowercaseSeparator(key)}: ${
					style[key as keyof React.CSSProperties]
				};`,
		)
		.join(" ");
}

/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
export const BaseSize = 2;
export const FontGap = 3;

// Prevent external hidden elements from adding accent styles
const EmphasizedStyles = {
	visibility: "visible !important",
};

export type AppendWatermark = (
	base64Url: string,
	markWidth: number,
	container: HTMLElement,
) => void;

export function useWatermark(
	markStyle: React.CSSProperties,
): [
	appendWatermark: AppendWatermark,
	removeWatermark: (container: HTMLElement) => void,
	isWatermarkEle: (ele: Node) => boolean,
] {
	const watermarkMapRef = React.useRef(new Map<HTMLElement, HTMLDivElement>());

	const appendWatermark = React.useCallback(
		(base64Url: string, markWidth: number, container: HTMLElement) => {
			if (container) {
				if (!watermarkMapRef.current.get(container)) {
					const newWatermarkEle = document.createElement("div");
					watermarkMapRef.current.set(container, newWatermarkEle);
				}

				const watermarkEle = watermarkMapRef.current.get(container)!;

				watermarkEle.setAttribute(
					"style",
					getStyleStr({
						...markStyle,
						backgroundImage: `url('${base64Url}')`,
						backgroundSize: `${Math.floor(markWidth)}px`,
						...(EmphasizedStyles as React.CSSProperties),
					}),
				);
				// Prevents using the browser `Hide Element` to hide watermarks
				watermarkEle.removeAttribute("class");

				container.append(watermarkEle);
			}
		},
		[markStyle],
	);

	// const appendWatermark = (
	//   base64Url: string,
	//   markWidth: number,
	//   container: HTMLElement
	// ) => {
	//   if (container) {
	//     if (!watermarkMap.get(container)) {
	//       const newWatermarkEle = document.createElement("div");
	//       watermarkMap.set(container, newWatermarkEle);
	//     }

	//     const watermarkEle = watermarkMap.get(container)!;

	//     watermarkEle.setAttribute(
	//       "style",
	//       getStyleStr({
	//         ...markStyle,
	//         backgroundImage: `url('${base64Url}')`,
	//         backgroundSize: `${Math.floor(markWidth)}px`,
	//         ...(EmphasizedStyles as React.CSSProperties),
	//       })
	//     );
	//     // Prevents using the browser `Hide Element` to hide watermarks
	//     watermarkEle.removeAttribute("class");

	//     container.append(watermarkEle);
	//   }
	// };

	const removeWatermark = React.useCallback((container: HTMLElement) => {
		const watermarkEle = watermarkMapRef.current.get(container);

		if (watermarkEle && container) {
			container.removeChild(watermarkEle);
		}

		watermarkMapRef.current.delete(container);
	}, []);

	const isWatermarkEle = React.useCallback(
		(ele: any) => Array.from(watermarkMapRef.current.values()).includes(ele),
		[],
	);

	return [appendWatermark, removeWatermark, isWatermarkEle];
}
