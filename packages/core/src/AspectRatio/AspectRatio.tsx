import { forwardRef } from "react";
import clsx from "clsx";

export interface AspectRatioProps {
  /**
   * 宽高比, 如: 16 / 9, 4 / 3, 1920 / 1080
   * 取值 @link https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
   * @default 1
   */
  ratio: string;
  className?: string;
  children?: React.ReactNode;
}
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (props, ref) => {
    const { ratio, className, children } = props;
    return (
      <div
        ref={ref}
        className={clsx(
          "[&>img]:object-cover [&_img]:w-full [&_img]:h-full",
          "[&>video]:object-cover [&_video]:w-full [&_video]:h-full",
          "[&>iframe]:object-cover [&_iframe]:w-full [&_iframe]:h-full",
          className
        )}
        style={{ aspectRatio: ratio }}
      >
        {children}
      </div>
    );
  }
);

AspectRatio.displayName = "@rtdui/AspectRatio";
