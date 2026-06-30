import clsx from "clsx";
import type { ThemeBaseSize, ThemeSemanticColor } from "../theme.types";

export interface OtpInputProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * 输入数字个数
   * @default 6
   */
  digits?: number;
  /** 主题的语义化尺寸 */
  size?: ThemeBaseSize;
  /** 主题的语义化颜色 */
  color?: ThemeSemanticColor;
}
export function OtpInput(props: OtpInputProps) {
  const { digits = 6, size, color } = props;

  return (
    <label
      className={clsx("otp", {
        "otp-xs": size === "xs",
        "otp-sm": size === "sm",
        "otp-md": size === "md",
        "otp-lg": size === "lg",
        "otp-xl": size === "xl",

        "otp-neutral": color === "neutral",
        "otp-primary": color === "primary",
        "otp-secondary": color === "secondary",
        "otp-accent": color === "accent",
        "otp-success": color === "success",
        "otp-info": color === "info",
        "otp-warning": color === "warning",
        "otp-error": color === "error",
      })}
    >
      {Array.from({ length: digits }).map((d) => (
        <span></span>
      ))}
      <input
        type="text"
        autoComplete="one-time-code"
        inputMode="numeric"
        maxLength={digits}
        pattern="[0-9]{6}"
        required
      />
    </label>
  );
}
