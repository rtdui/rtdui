import clsx from "clsx";
import React from "react";

export interface CardProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title" | "content"> {
  glass?: boolean; // 毛玻璃效果, 需要有背景才有效果
  imageSrc?: string;
  imageSide?: boolean; // 图像在两边
  imageOverlay?: boolean; // 图像作为Card背景
  shadowSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"; // Card阴影尺寸
  title?: React.ReactNode;
  content?: React.ReactNode;
  action?: React.ReactNode;
}

/** ref属性会转发至内部的根div元素 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const {
      title,
      content,
      action,
      imageSrc,
      imageOverlay,
      imageSide,
      shadowSize,
      glass,
      className,
      children,
      ...other
    } = props;

    return (
      <div
        ref={ref}
        className={clsx(
          "card bg-base-200",
          {
            "card-side": imageSide === true,
            "image-full": imageOverlay === true,
            shadow: shadowSize === "xs",
            "shadow-sm": shadowSize === "sm",
            "shadow-md": shadowSize === "md",
            "shadow-lg": shadowSize === "lg",
            "shadow-xl": shadowSize === "xl",
            "shadow-2xl": shadowSize === "2xl",
            glass: glass === true,
          },
          className
        )}
      >
        {imageSrc && (
          <figure>
            <img src={imageSrc} alt="" />
          </figure>
        )}
        <div className="card-body">
          {title && <h2 className="card-title">{title}</h2>}
          {content}
          {action && <div className="card-actions justify-end">{action}</div>}
        </div>
      </div>
    );
  }
);
