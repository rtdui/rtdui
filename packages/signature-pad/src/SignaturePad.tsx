import { Button } from "@rtdui/core";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import ReactSignaturePad, {
  type FromDataOptions,
  type PointGroup,
  type ToSVGOptions,
} from "signature_pad";
// import trimCanvas from "trim-canvas";

// Define the handle types which will be passed to the forwardRef
export type SignaturePadHandle = {
  /** Clears the canvas */
  clear(): void;
  /** Returns true if canvas is empty, otherwise returns false */
  isEmpty(): boolean;

  /** Draws signature image from data URL and alters it with the given options */
  fromDataURL(
    dataUrl: string,
    options?: {
      ratio?: number;
      width?: number;
      height?: number;
      xOffset?: number;
      yOffset?: number;
    }
  ): Promise<void>;
  /** Returns signature image as SVG data URL with {includeBackgroundColor} option */
  toDataURL(type: "image/svg+xml", encoderOptions?: ToSVGOptions): string;
  /** Returns signature image as data URL */
  toDataURL(type?: string, quality?: number): string;

  /** Draws signature image from an array of point groups */
  fromData(pointGroups: PointGroup[], option?: FromDataOptions): void;
  /** Returns signature image as an array of point groups */
  toData(): PointGroup[];

  /** Return svg string without converting to base64 */
  toSVG(option?: ToSVGOptions): string;

  undo(): void;
  redo(): void;
};

export interface SignaturePadProps
  extends Omit<React.ComponentPropsWithoutRef<"canvas">, "width" | "height"> {
  /** canvas width
   * @default 300
   */
  width?: number;
  /** canvas height
   * @default 150
   */
  height?: number;
  withClear?: boolean;
  /** clear button text, can be localized
   * @default "Clear"
   */
  clearLabel?: string;
  /** confirm button text, can be localized
   * @default "Confirm"
   */
  confirmLabel?: string;
  onClear?: () => void;
  onConfirm?: () => void;

  // signature_pad's props
  /** Weight used to modify new velocity based on the previous velocity
   * @default 0.7
   */
  velocityFilterWeight?: number;
  /** Draw the next point at most once in milliseconds. Set it to 0 to turn off throttling
   * @default 16
   */
  throttle?: number;
  /** Minimum width of a line
   * @default 0.5
   */
  minWidth?: number;
  /** Maximum width of a line
   * @default 2.5
   */
  maxWidth?: number;
  /**  Add the next point only if the previous one is farther than x pixels.
   * @default 5
   */
  minDistance?: number;
  /** Radius of a single dot. Also the width of the start of a mark.
   * @default(minWidth + maxWidth) / 2
   */
  dotSize?: number;
  /** Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "black"
   * @default "black"
   */
  penColor?: React.CSSProperties["fill"];
  /** Color used to canvas the background. Can be any color format accepted by context.fillStyle.
   * Use a non-transparent color e.g. "rgb(255,255,255)" if you'd like to save signatures as JPEG images.
   * @default "transparent"
   */
  backgroundColor?: React.CSSProperties["fill"];

  canvasContextOptions?: CanvasRenderingContext2DSettings;
}
export const SignaturePad = forwardRef<any, SignaturePadProps>((props, ref) => {
  const {
    width = 300,
    height = 150,
    clearLabel = "Clear",
    confirmLabel = "Confirm",
    onConfirm,
    onClear,

    velocityFilterWeight = 0.7,
    minWidth = 0.5,
    maxWidth = 2.5,
    minDistance = 5,
    dotSize = (minWidth + maxWidth) / 2,
    throttle = 16,
    penColor = "black",
    backgroundColor = "transparent",
    canvasContextOptions,
    ...others
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const signPadRef = useRef<ReactSignaturePad>(null!);
  const undosRef = useRef<any[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      clear: () => signPadRef.current.clear(),
      isEmpty: () => signPadRef.current.isEmpty(),

      toDataURL: (type?: string, encoderOptions?: number) =>
        signPadRef.current.toDataURL(type, encoderOptions),
      fromDataURL: (
        dataUrl: string,
        option?: {
          ratio?: number;
          width?: number;
          height?: number;
          xOffset?: number;
          yOffset?: number;
        }
      ) => signPadRef.current.fromDataURL(dataUrl, option),

      toData: () => signPadRef.current.toData(),
      fromData: (pointGroups: PointGroup[], option?: FromDataOptions) =>
        signPadRef.current.fromData(pointGroups, option),

      toSVG: (option: ToSVGOptions) => signPadRef.current.toSVG(option),

      undo,
      redo,
    }),
    []
  );

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    /* When zoomed out to less than 100%, for some very strange reason,
        some browsers report devicePixelRatio as less than 1
        and only part of the canvas is cleared then. */
    const ratio = Math.max(window.devicePixelRatio ?? 1, 1);
    canvas.width = width * ratio;
    canvas.style.width = `${width}px`;
    canvas.height = height * ratio;
    canvas.style.height = `${height}px`;

    // reset transform matrix
    canvas.getContext("2d")!.resetTransform();
    canvas.getContext("2d")!.scale(ratio, ratio);
    clear();
  };

  // all wrapper functions below render
  const on = () => {
    signPadRef.current.addEventListener("endStroke", resetUndos);
    return signPadRef.current.on();
  };

  const off = () => {
    signPadRef.current.removeEventListener("endStroke", resetUndos);
    return signPadRef.current.off();
  };

  const clear = () => {
    return signPadRef.current.clear();
  };

  const resetUndos = () => {
    undosRef.current = [];
  };

  const undo = () => {
    const data = signPadRef.current.toData();

    if (data && data.length > 0) {
      // remove the last dot or line
      const removed = data.pop();
      undosRef.current.push(removed);
      signPadRef.current.fromData(data);
    }
  };

  const redo = () => {
    if (undosRef.current.length > 0) {
      const data = signPadRef.current.toData();
      data.push(undosRef.current.pop());
      signPadRef.current.fromData(data);
    }
  };

  useEffect(() => {
    signPadRef.current = new ReactSignaturePad(canvasRef.current, {
      velocityFilterWeight,
      minWidth,
      maxWidth,
      minDistance,
      dotSize,
      penColor,
      backgroundColor,
      throttle,
      canvasContextOptions,
    });
    on();
    setupCanvas();

    return () => off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.assign(signPadRef.current, {
      velocityFilterWeight,
      minWidth,
      maxWidth,
      minDistance,
      dotSize,
      penColor,
      backgroundColor,
      throttle,
      canvasContextOptions,
    });
  }, [
    velocityFilterWeight,
    minWidth,
    maxWidth,
    minDistance,
    dotSize,
    penColor,
    backgroundColor,
    throttle,
    canvasContextOptions,
  ]);

  return (
    <div className="flex flex-col gap-2 w-fit select-none">
      <div className="bg-base-200 select-none">
        <canvas ref={canvasRef} {...others} width={width} height={height} />
      </div>
      <div className="flex justify-between">
        <Button
          size="sm"
          onClick={(e) => {
            clear();
            onClear?.();
          }}
        >
          {clearLabel}
        </Button>
        <Button
          size="sm"
          onClick={(e) => {
            onConfirm?.();
          }}
          color="primary"
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
});

SignaturePad.displayName = "@rtdui/signature-pad/SignaturePad";
