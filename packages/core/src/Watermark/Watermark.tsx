import React from "react";
import clsx from "clsx";
import { useMutateObserver, useRafDebounce } from "@rtdui/hooks";
import { drawWatermark } from "./drawWatermark";
import { useWatermark } from "./useWatermark";

const FontGap = 3;

const DEFAULT_GAP_X = 100;
const DEFAULT_GAP_Y = 100;
/**
 * Switch与Checkbox组件的属性相同.
 */
export interface WatermarkProps {
  /** 图像url */
  imageSrc?: string;
  text?: string | string[];
  /** 旋转度数, 正数顺时针, 负数逆时针
   * @default -22
   */
  rotate?: number;
  width?: number;
  height?: number;
  /** 填充色 */
  fillColor?: CanvasFillStrokeStyles["fillStyle"];
  font?: {
    fontSize?: number | string;
    fontWeight?: "normal" | "light" | "weight" | number;
    fontStyle?: "none" | "normal" | "italic" | "oblique";
    fontFamily?: string;
  };
  gap?: [number, number];
  offset?: [number, number];
  children?: React.ReactNode;
  className?: string;
}

export const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(
  (props, ref) => {
    const {
      imageSrc,
      text,
      rotate = -22,
      width,
      height,
      fillColor = "rgba(0,0,0,0.15)",
      font,
      gap = [DEFAULT_GAP_X, DEFAULT_GAP_Y],
      offset,
      ...other
    } = props;
    const {
      fontSize = 16,
      fontWeight = "normal",
      fontStyle = "normal",
      fontFamily = "sans-serif",
    } = font ?? {};

    const [gapX = DEFAULT_GAP_X, gapY = DEFAULT_GAP_Y] = gap;

    const gapXCenter = gapX / 2;
    const gapYCenter = gapY / 2;
    const offsetLeft = offset?.[0] ?? gapXCenter;
    const offsetTop = offset?.[1] ?? gapYCenter;

    const containerRef = React.useRef<HTMLDivElement>(null!);

    const markStyle = React.useMemo(() => {
      const mergedStyle: React.CSSProperties = {
        zIndex: 99999,
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        backgroundRepeat: "repeat",
      };

      /** Calculate the style of the offset */
      let positionLeft = offsetLeft - gapXCenter;
      let positionTop = offsetTop - gapYCenter;
      if (positionLeft > 0) {
        mergedStyle.left = `${positionLeft}px`;
        mergedStyle.width = `calc(100% - ${positionLeft}px)`;
        positionLeft = 0;
      }
      if (positionTop > 0) {
        mergedStyle.top = `${positionTop}px`;
        mergedStyle.height = `calc(100% - ${positionTop}px)`;
        positionTop = 0;
      }
      mergedStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

      return mergedStyle;
    }, [offsetLeft, offsetTop, gapXCenter, gapYCenter]);

    const getMarkSize = (ctx: CanvasRenderingContext2D) => {
      let defaultWidth = 120;
      let defaultHeight = 64;
      if (!imageSrc && ctx.measureText) {
        ctx.font = `${Number(fontSize)}px ${fontFamily}`;
        const texts = Array.isArray(text) ? text : [text];
        const sizes = texts.map((d) => {
          const metrics = ctx.measureText(d!);

          return [
            metrics.width,
            metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
          ];
        });
        defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
        defaultHeight =
          Math.ceil(Math.max(...sizes.map((size) => size[1]))) * texts.length +
          (texts.length - 1) * FontGap;
      }
      return [width ?? defaultWidth, height ?? defaultHeight] as const;
    };

    const [watermarkInfo, setWatermarkInfo] = React.useState<
      [base64: string, contentWidth: number]
    >(null!);

    // 生成水印到状态
    const genWatermark = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const ratio = window.devicePixelRatio || 1;
        const [markWidth, markHeight] = getMarkSize(ctx);

        const drawCanvas = (
          drawContent?: NonNullable<WatermarkProps["text"]> | HTMLImageElement
        ) => {
          const [dataUrl, clipWidth] = drawWatermark(
            drawContent || "",
            rotate,
            ratio,
            markWidth,
            markHeight,
            {
              fontSize,
              fontStyle,
              fontWeight,
              fontFamily,
            },
            fillColor,
            gapX,
            gapY
          );

          setWatermarkInfo([dataUrl, clipWidth]);
        };

        if (imageSrc) {
          const img = new Image();
          img.onload = () => {
            drawCanvas(img);
          };
          img.onerror = () => {
            drawCanvas(text);
          };
          img.crossOrigin = "anonymous";
          img.referrerPolicy = "no-referrer";
          img.src = imageSrc;
        } else {
          drawCanvas(text);
        }
      }
    };

    // 在requestAnimationFrame中生成水印
    const syncWatermark = useRafDebounce(genWatermark);

    // Append watermark to the container
    const [appendWatermark, removeWatermark, isWatermarkEle] =
      useWatermark(markStyle);

    React.useEffect(() => {
      if (watermarkInfo) {
        appendWatermark(
          watermarkInfo[0],
          watermarkInfo[1],
          containerRef.current
        );
      }
    }, [appendWatermark, watermarkInfo]);

    // ============================ Mutation Observe =============================

    const reRendering = (
      mutation: MutationRecord,
      isWatermarkEle: (ele: any) => boolean
    ) => {
      let flag = false;
      // Whether to delete the watermark node
      if (mutation.removedNodes.length) {
        flag = Array.from(mutation.removedNodes).some((node) =>
          isWatermarkEle(node)
        );
      }
      // Whether the watermark dom property value has been modified
      if (mutation.type === "attributes" && isWatermarkEle(mutation.target)) {
        flag = true;
      }
      return flag;
    };

    const onMutate = (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (reRendering(mutation, isWatermarkEle)) {
          syncWatermark();
        }
      });
    };
    useMutateObserver(containerRef.current, onMutate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(syncWatermark, [
      rotate,
      width,
      height,
      imageSrc,
      text,
      fillColor,
      fontSize,
      fontWeight,
      fontStyle,
      fontFamily,
      gapX,
      gapY,
      offsetLeft,
      offsetTop,
    ]);

    return (
      <div ref={containerRef} className={clsx("relative z-0")} {...other} />
    );
  }
);
