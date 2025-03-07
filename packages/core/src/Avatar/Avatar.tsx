import { forwardRef } from "react";
import clsx from "clsx";
import { useAvatarGroupContext } from "../AvatarGroup/AvatarGroup.context";
import type { ThemeBaseSize } from "../theme.types";

export interface AvatarProps {
	/** 头像的url */
	src?: string;
	size?: ThemeBaseSize;
	/**
	 * 方形或圆形变体
	 * @default circle
	 */
	variant?: "square" | "circle";
	className?: string;
	online?: boolean;
	/** 只显示一些字符, src属性的优先级比placeholder属性高. 不建议超过两个字符 */
	placeholder?: string;
	mask?:
		| "squircle"
		| "heart"
		| "star"
		| "triangle"
		| "diamond"
		| "pentagon"
		| "hexagon"
		| "hexagon2"
		| "decagon";

	slots?: {
		wrapper?: string;
	};
}
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
	const {
		src,
		size: sizeProp = "md",
		variant = "circle",
		mask,
		online,
		placeholder,
		className,
		slots,
		...other
	} = props;

	const avatarGroup = useAvatarGroupContext();

	let size = sizeProp;

	// 在AvatarGroup下时, 忽略自身的size属性值, 优先使用AvatarGroup上下文提供的值
	if (avatarGroup) {
		size = avatarGroup.size ?? size;
	}

	const isPlaceholder = !src && !!placeholder;

	return (
		<div
			className={clsx(
				"avatar",
				{
					"avatar-online": online === true,
					"avatar-offline": online === false,
					"avatar-placeholder": isPlaceholder,
				},
				className,
			)}
			{...other}
		>
			<div
				className={clsx(
					"avatar-wrapper",
					{
						"w-8": size === "xs",
						"w-12": size === "sm",
						"w-16": size === "md",
						"w-20": size === "lg",
						"w-24": size === "xl",
						"rounded-xl": mask === undefined && variant === "square",
						"rounded-full": mask === undefined && variant === "circle",
						"bg-neutral text-neutral-content": isPlaceholder,
						"mask mask-squircle": mask === "squircle",
						"mask mask-heart": mask === "heart",
						"mask mask-star-2": mask === "star",
						"mask mask-triangle": mask === "triangle",
						"mask mask-diamond": mask === "diamond",
						"mask mask-pentagon": mask === "pentagon",
						"mask mask-hexagon": mask === "hexagon",
						"mask mask-hexagon-2": mask === "hexagon2",
						"mask mask-decagon": mask === "decagon",
					},
					slots?.wrapper,
				)}
			>
				{src ? (
					<img src={src} alt="avatar" />
				) : (
					<span
						className={clsx({
							"text-xs": size === "xs",
							"text-sm": size === "sm",
							"text-base": size === "md",
							"text-xl": size === "lg",
							"text-2xl": size === "xl",
						})}
					>
						{placeholder}
					</span>
				)}
			</div>
		</div>
	);
});

Avatar.displayName = "@rtdui/Avatar";
