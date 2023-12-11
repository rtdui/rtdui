import clsx from "clsx";
import React from "react";
import { useAvatarGroupContext } from "../AvatarGroup/AvatarGroup.context";

export interface AvatarProps {
  /** 头像的url */
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * 方形或圆形变体
   * @default circle
   */
  variant?: "square" | "circle";
  className?: string;
  online?: boolean;
  /**
   * 只显示一些字符
   * src属性的优先级比placeholder属性高.
   * 不建议超过两个字符
   */
  placeholder?: string;
}
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const {
      src,
      size: sizeProp = "md",
      variant = "circle",
      online,
      placeholder,
      className,
      ...other
    } = props;

    const avatarGroup = useAvatarGroupContext();

    let size = sizeProp;

    // 在AvatarGroup下时, 忽略自身的size属性值, 优先使用AvatarGroup上下文提供的值
    if (avatarGroup) {
      size = avatarGroup.size ?? size;
    }

    return (
      <div
        className={clsx(
          "avatar",
          {
            online: online === true,
            offline: online === false,
            placeholder: Boolean(placeholder),
          },
          className
        )}
        {...other}
      >
        <div
          className={clsx({
            "w-8": size === "xs",
            "w-12": size === "sm",
            "w-16": size === "md",
            "w-24": size === "lg",
            "rounded-xl": variant === "square",
            "rounded-full": variant === "circle",
            "bg-neutral text-neutral-content": Boolean(!src && placeholder),
          })}
        >
          {src ? (
            <img src={src} alt="avatar" />
          ) : (
            <span
              className={clsx({
                "text-base": size === "xs",
                "text-xl": size === "sm",
                "text-2xl": size === "md",
                "text-3xl": size === "lg",
              })}
            >
              {placeholder}
            </span>
          )}
        </div>
      </div>
    );
  }
);
