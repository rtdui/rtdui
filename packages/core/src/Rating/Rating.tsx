import { forwardRef } from "react";
import clsx from "clsx";
import { useUncontrolled } from "@rtdui/hooks";

export interface RatingProps {
	name?: string;
	defaultValue?: number;
	/**
	 * 当前的星级, 从1开始
	 * @default 5
	 */
	value?: number;

	onChange?: (val: number) => void;
	/**
	 * 评级的数量
	 * @default 5
	 */
	count?: number;
	/**
	 * 是否可评半级
	 * @default 5
	 */
	half?: boolean;

	/**
	 * 星图像
	 * @default star2
	 */
	star?: "star" | "star2" | "heart";
	/**
	 * 显示尺寸
	 * @link SizeMode
	 */
	size?: "xs" | "sm" | "md" | "lg";
	className?: string;
	slots?: {
		star?: string;
	};
}
/**
 * 星级评分
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>((props, ref) => {
	const {
		name,
		half,
		size,
		star = "star2",
		value: valueProp,
		defaultValue,
		onChange,
		className,
		slots,
	} = props;

	const [value, setValue] = useUncontrolled({
		value: valueProp,
		defaultValue,
		finalValue: 0,
		onChange,
	});

	const arr = Array.from({ length: half ? 10 : 5 });

	return (
		<div
			ref={ref}
			className={clsx(
				"rating",
				{
					"rating-xs": size === "xs",
					"rating-sm": size === "sm",
					"rating-md": size === "md",
					"rating-lg": size === "lg",
					"rating-half": half,
				},
				className,
			)}
		>
			{/* 该hidden用于当组件作为form的控件时自动上传星级的值 */}
			<input type="hidden" name={name} value={value} />
			{/* 星级 */}
			{/* 该radio用于清空星级 */}
			<input
				type="radio"
				className="rating-hidden"
				checked={value === 0}
				onChange={(e) => setValue(0)}
			/>
			{arr.map((_, index) => (
				<input
					key={index}
					type="radio"
					className={clsx(
						"mask",
						{
							"mask-star": star === "star",
							"mask-star-2": star === "star2",
							"mask-heart": star === "heart",
							"mask-half-1": half && index % 2 === 0,
							"mask-half-2": half && index % 2 === 1,
						},
						slots?.star,
					)}
					checked={value === index + 1}
					onChange={(e) => setValue(index + 1)}
				/>
			))}
		</div>
	);
});

Rating.displayName = "@rtdui/Rating";
