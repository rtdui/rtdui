import { forwardRef } from "react";
import clsx from "clsx";

export interface CardProps
	extends Omit<React.ComponentPropsWithoutRef<"div">, "title" | "content"> {
	glass?: boolean; // 毛玻璃效果, 需要有背景才有效果
	imageSrc?: string;
	/** image positon
	 * @default "top"
	 */
	imagePositon?: "top" | "right" | "bottom" | "left" | "overlay"; // 图像在两边
	shadow?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"; // Card阴影尺寸
	title?: React.ReactNode;
	content?: React.ReactNode;
	action?: React.ReactNode;
	slots?: {
		figure?: string;
		body?: string;
		title?: string;
		content?: string;
		actions?: string;
	};
}

/** ref属性会转发至内部的根div元素 */
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
	const {
		title,
		content,
		action,
		imageSrc,
		imagePositon = "top",
		shadow,
		glass,
		className,
		slots,
		children,
		...others
	} = props;

	const figure = (
		<figure className={clsx("figure", slots?.figure)}>
			<img className="object-cover w-full h-full" src={imageSrc} alt="" />
		</figure>
	);

	return (
		<div
			ref={ref}
			className={clsx(
				"card",
				{
					"card-side": imagePositon === "left" || imagePositon === "right",
					"image-full": imagePositon === "overlay",

					"shadow-sm": shadow === "xs",
					shadow: shadow === "sm",
					"shadow-md": shadow === "md",
					"shadow-lg": shadow === "lg",
					"shadow-xl": shadow === "xl",
					"shadow-2xl": shadow === "2xl",
					glass: glass === true,
				},
				className,
			)}
			{...others}
		>
			{imageSrc &&
				(imagePositon === "top" ||
					imagePositon === "left" ||
					imagePositon === "overlay") &&
				figure}
			<div className={clsx("card-body", slots?.body)}>
				{title && <h2 className={clsx("card-title", slots?.title)}>{title}</h2>}
				<div className={clsx("coard-content", "flex-1", slots?.content)}>
					{content}
				</div>
				{action && (
					<div className={clsx("card-actions", "justify-end", slots?.actions)}>
						{action}
					</div>
				)}
			</div>
			{imageSrc &&
				(imagePositon === "bottom" || imagePositon === "right") &&
				figure}
		</div>
	);
});

Card.displayName = "@rtdui/Card";
