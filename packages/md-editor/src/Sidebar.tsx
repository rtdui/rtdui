import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import { useMdEditorContext } from "./context";
import type { ActivedSidebar } from "./types";

export interface SidebarOwnProps {
	activedSidebar?: ActivedSidebar;
}
export type SidebarProps = SidebarOwnProps &
	Omit<React.ComponentPropsWithoutRef<"div">, keyof SidebarOwnProps>;

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
	(props, ref) => {
		const { activedSidebar, className, ...other } = props;
		const { locale, toolbars = [], meta } = useMdEditorContext();

		const actions = useMemo(() => {
			return toolbars.flatMap((item) => {
				if (item.type === "single") {
					return [item];
				} else if (item.type === "multiple") {
					return item.actions;
				} else {
					return [];
				}
			});
		}, []);

		const getContent = () => {
			switch (activedSidebar) {
				case "toc": {
					return (
						<>
							<h2>{locale?.toc}</h2>
							<ul className="list-disc pl-4">
								{meta?.toc.map(({ level, text, slug }, i) => (
									<li
										key={i}
										style={{ marginLeft: `${(level - 1) * 16}px` }}
										className="text-sm leading-6"
									>
										<a href={`#${slug}`} className="underline">
											{text}
										</a>
									</li>
								))}
							</ul>
						</>
					);
				}
				case "help":
					return (
						<>
							<h2>{locale?.cheatsheet}</h2>
							<ul className="p-0 text-gray-500 text-sm">
								{actions.map(
									(d) =>
										d.cheatsheet && (
											<li
												key={d.title}
												className="list-none flex items-center mt-1"
											>
												<div className="title flex items-center flex-1">
													{d.icon}
													{"\u00a0"}
													{d.title}
												</div>
												<div className="content flex items-center">
													<code>{d.cheatsheet}</code>
												</div>
											</li>
										),
								)}
							</ul>
							{/* <h2>{locale?.shortcuts}</h2>
              <ul className="p-0 text-gray-500 text-sm">
                {actions.map(
                  (d) =>
                    d.shortcut && (
                      <li
                        key={d.shortcut}
                        className="list-none flex items-center mt-1"
                      >
                        <div className="title">{d.title}</div>
                        <div className="flex-1"></div>
                        <div className="content">
                          <code>{d.shortcut}</code>
                        </div>
                      </li>
                    )
                )}
              </ul> */}
						</>
					);
				default:
					return null;
			}
		};

		return (
			<div ref={ref} {...other} className={clsx("md-sidebar", className)}>
				{getContent()}
			</div>
		);
	},
);

Sidebar.displayName = "Sidebar";
