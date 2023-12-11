import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import clsx from "clsx";

interface ImageSettings {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  /** 未定义会在二维码的中心 */
  x?: number;
  /** 未定义会在二维码的中心 */
  y?: number;
}
interface QRProps {
  /** 扫描后的文本 */
  value: string;
  /**
   * 二维码的大小
   * @default 160
   */
  size?: number;
  /**
   * 纠错级别
   * @default "M"
   */
  level?: "L" | "M" | "Q" | "H";
  /**
   * 背景色
   * @default "#fff"
   */
  bgColor?: string;
  /**
   * 二维码颜色
   * @default "#000"
   */
  fgColor?: string;
  style?: React.CSSProperties;
  includeMargin?: boolean;
  imageSettings?: ImageSettings;
}

export interface QRCodeProps
  extends React.ComponentPropsWithoutRef<"div">,
    QRProps {
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
  slots?: { qr: string };
}

export function QRCode(props: QRCodeProps) {
  const {
    value,
    size = 160,
    icon = "",
    iconSize = 40,
    fgColor = "#000",
    bgColor = "#fff",
    level = "M",
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
