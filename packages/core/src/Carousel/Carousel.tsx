import { forwardRef, useRef } from "react";
import clsx from "clsx";
import { Button } from "../Button/Button";

export interface CarouselProps {
	items: { imageSrc: string }[];
	/**
	 * 变体, arrow使用next/prev箭头按钮切换. number使用数字按钮切换
	 * @default arrow
	 */
	indicator?: "arrow" | "number";
	className?: string;
}
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
	(props, ref) => {
		const { items, indicator = "arrow", className } = props;

		const innerRef = useRef<HTMLDivElement[]>([]);

		const next = (index: number) => {
			innerRef.current[index + 1].scrollIntoView(false);
		};
		const prev = (index: number) => {
			innerRef.current[index - 1].scrollIntoView(false);
		};

		const go = (index: number) => {
			innerRef.current[index].scrollIntoView(false);
		};

		return (
			<div>
				<div ref={ref} className={clsx("carousel", className)}>
					{items.map((d, index) => (
						<div
							key={index}
							ref={(node) => innerRef.current.push(node!)}
							className="carousel-item w-full relative"
						>
							<img
								src={d.imageSrc}
								alt={`carousel-${index}`}
								className="w-full"
							/>
							{indicator === "arrow" && (
								// 导航按钮放置在carousel-item内是为了防止随着carousel滚动而滚走
								<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
									<Button
										disabled={index === 0}
										sharp="circle"
										onClick={(e) => prev(index)}
									>
										❮
									</Button>
									<Button
										disabled={index === items.length - 1}
										sharp="circle"
										onClick={(e) => next(index)}
									>
										❯
									</Button>
								</div>
							)}
						</div>
					))}
				</div>
				{indicator === "number" && (
					<div className="flex justify-center w-full py-2 gap-2">
						{items.map((d, index) => (
							<Button key={index} size="xs" onClick={(e) => go(index)}>
								{index + 1}
							</Button>
						))}
					</div>
				)}
			</div>
		);
	},
);

Carousel.displayName = "@rtdui/Carousel";
