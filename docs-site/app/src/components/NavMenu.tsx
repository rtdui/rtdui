import { NavLink } from "react-router";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";

interface NavMenuProps {
	data?: {
		group: string;
		items: { label: string; url: string; flag?: "string" }[];
	}[];
	onClick?: () => void;
	className?: string;
}
export default function NavMenu(props: NavMenuProps) {
	const { data = [], onClick, className } = props;
	const { t } = useTranslation();
	return (
		<ul className={clsx("menu w-full", "pb-9", className)}>
			{data.map((d) => (
				<React.Fragment key={d.group}>
					<li>
						<details open>
							<summary className="opacity-50 font-bold">
								{t(`navMenu.group.${d.group}`)}
							</summary>
							{/* <h2 className="menu-title">{t(`navMenu.group.${d.group}`)}</h2> */}
							<ul>
								{d.items.map((dd) => (
									<li key={`${d.group}-${dd.label}`}>
										<NavLink
											to={dd.url}
											onClick={onClick}
											className={({ isActive, isPending }) =>
												isPending
													? "pending"
													: isActive
														? "menu-active"
														: undefined
											}
										>
											{t(`navMenu.${dd.label}`)}
											{dd.flag && (
												<span className="text-secondary text-right">
													{dd.flag}
												</span>
											)}
										</NavLink>
									</li>
								))}
							</ul>
						</details>
					</li>
				</React.Fragment>
			))}
		</ul>
	);
}
