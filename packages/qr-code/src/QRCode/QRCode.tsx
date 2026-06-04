import { QRCodeCanvas } from "qrcode.react";
import clsx from "clsx";

//#region copy from qrcode.react/lib/index.d.mts
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;
type ImageSettings = {
  /**
   * The URI of the embedded image.
   */
  src: string;
  /**
   * The height, in pixels, of the image.
   */
  height: number;
  /**
   * The width, in pixels, of the image.
   */
  width: number;
  /**
   * Whether or not to "excavate" the modules around the embedded image. This
   * means that any modules the embedded image overlaps will use the background
   * color.
   */
  excavate: boolean;
  /**
   * The horiztonal offset of the embedded image, starting from the top left corner.
   * Will center if not specified.
   */
  x?: number;
  /**
   * The vertical offset of the embedded image, starting from the top left corner.
   * Will center if not specified.
   */
  y?: number;
  /**
   * The opacity of the embedded image in the range of 0-1.
   * @defaultValue 1
   */
  opacity?: number;
  /**
   * The cross-origin value to use when loading the image. This is used to
   * ensure compatibility with CORS, particularly when extracting image data
   * from QRCodeCanvas.
   * Note: `undefined` is treated differently than the seemingly equivalent
   * empty string. This is intended to align with HTML behavior where omitting
   * the attribute behaves differently than the empty string.
   */
  crossOrigin?: CrossOrigin;
};
type QRProps = {
  /**
   * The value to encode into the QR Code. An array of strings can be passed in
   * to represent multiple segments to further optimize the QR Code.
   */
  value: string | string[];
  /**
   * The size, in pixels, to render the QR Code.
   * @defaultValue 128
   */
  size?: number;
  /**
   * The Error Correction Level to use.
   * @see https://www.qrcode.com/en/about/error_correction.html
   * @defaultValue L
   */
  level?: ErrorCorrectionLevel;
  /**
   * The background color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #FFFFFF
   */
  bgColor?: string;
  /**
   * The foregtound color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #000000
   */
  fgColor?: string;
  /**
   * The number of _modules_ to use for margin. The QR Code specification
   * requires `4`, however you can specify any number. Values will be turned to
   * integers with `Math.floor`. Overrides `includeMargin` when both are specified.
   * @defaultValue 0
   */
  marginSize?: number;
  /**
   * The title to assign to the QR Code. Used for accessibility reasons.
   */
  title?: string;
  /**
   * The minimum version used when encoding the QR Code. Valid values are 1-40
   * with higher values resulting in more complex QR Codes. The optimal
   * (lowest) version is determined for the `value` provided, using `minVersion`
   * as the lower bound.
   * @defaultValue 1
   */
  minVersion?: number;
  /**
   * If enabled, the Error Correction Level of the result may be higher than
   * the specified Error Correction Level option if it can be done without
   * increasing the version.
   * @defaultValue true
   */
  boostLevel?: boolean;
  /**
   * The settings for the embedded image.
   */
  imageSettings?: ImageSettings;
};
//#endregion

export interface QRCodeProps extends React.ComponentProps<"div">, QRProps {
  /** 二维码中图片的地址（目前只支持图片地址） */
  icon?: string;
  /** 二维码中图片的大小
   * @default 40
   */
  iconSize?: number;
  /**
   * expired状态时点击"点击刷新"的回调
   * @default () => void
   */
  onRefresh?: () => void;
  slots?: { qr?: string };
}

export function QRCode(props: QRCodeProps) {
  const {
    value,
    size = 128,
    icon = "",
    iconSize = 40,
    fgColor = "#000",
    bgColor = "#fff",
    level = "L",
    onRefresh,
    slots,
    className,
    ...other
  } = props;

  const imageSettings: ImageSettings = {
    src: icon,
    height: iconSize,
    width: iconSize,
    excavate: true,
  };

  const qrProps: QRProps = {
    value,
    size,
    level,
    bgColor,
    fgColor,
    imageSettings: icon ? imageSettings : undefined,
  };

  const handleClick = () => {
    onRefresh?.();
  };

  return (
    <div
      {...other}
      onClick={handleClick}
      className={clsx("select-none", className)}
    >
      <QRCodeCanvas {...qrProps} className={clsx(slots?.qr)} />
    </div>
  );
}
