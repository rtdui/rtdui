import type React from "react";
import clsx from "clsx";

export interface TreeProp {
	data: Record<string, any>[];
	childrenField?: string;
	displayField: string;
	onItemClick?: (item: any) => void;
	ItemIconComponent?: React.ElementType;
	ItemActionsComponent?: React.ElementType;
	expandAll?: boolean;
	className?: string;
}
export function Tree(props: TreeProp) {
	const {
		data,
		expandAll = true,
		displayField,
		childrenField = "children",
		onItemClick,
		ItemIconComponent,
		ItemActionsComponent,
		className,
	} = props;

	const handleItemClick = (
		e: React.MouseEvent<HTMLLIElement>,
		item: Record<string, any>,
	) => {
		e.stopPropagation();
		if (item[childrenField]) {
			e.currentTarget
				.querySelector(".menu-dropdown-toggle")
				?.classList.toggle("menu-dropdown-show");
			e.currentTarget
				.querySelector(".menu-dropdown")
				?.classList.toggle("menu-dropdown-show");
		} else {
			onItemClick?.(item);
		}
	};

	const recurse = (data: Record<string, any>[], depth = 0) => {
		const items = [];
		for (let index = 0; index < data.length; index++) {
			const item = data[index];
			if (item[childrenField]) {
				items.push(
					<li
						key={`${depth}-${index}`}
						onClick={(e) => handleItemClick(e, item)}
					>
						{/* details 方案在iOS 14及以下的Safari中存在问题:summary元素的display属性固定为list-item,无法修改. 暂时用span替代 */}
						{/* <details open={expandAll}>
              <summary className="text-base">
                {ItemIconComponent && <ItemIconComponent item={item} />}
                {item[displayField]}
              </summary> */}
						<span
							className={clsx("menu-dropdown-toggle text-base", {
								"menu-dropdown-show": expandAll,
							})}
						>
							{ItemIconComponent && <ItemIconComponent item={item} />}
							{item[displayField]}
						</span>
						<ul
							className={clsx("menu-dropdown", {
								"menu-dropdown-show": expandAll,
							})}
						>
							{recurse(item[childrenField], depth + 1)}
						</ul>
						{/* </details> */}
					</li>,
				);
			} else {
				items.push(
					<li
						key={`${depth}-${index}`}
						onClick={(e) => handleItemClick(e, item)}
					>
						<div className="flex gap-1 items-center">
							{ItemIconComponent && <ItemIconComponent item={item} />}
							<a className="grow text-base" href={item.url}>
								{item[displayField]}
							</a>
							{ItemActionsComponent && (
								<div className="flex items-center gap-1">
									<ItemActionsComponent item={item} />
								</div>
							)}
						</div>
					</li>,
				);
			}
		}
		return items;
	};

	const items = recurse(data);

	return <ul className={clsx("menu", className)}>{items}</ul>;
}
