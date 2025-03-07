import clsx from "clsx";

export interface TimeNode {
	moment?: React.ReactNode;
	icon?: React.ReactNode;
	description: React.ReactNode;
	className?: string;
}

export interface TimelineProps {
	/** 节点列表 */
	nodes: TimeNode[];
}

/**
 *
 * 支持响应式的样式类: timeline-vertical, timeline-horizontal
 * @param props
 * @returns
 */
export function Timeline(props: TimelineProps) {
	const { nodes } = props;

	return (
		<ul className="timeline">
			{nodes.map((d, i) => (
				<li key={i}>
					{d.moment && <div className="timeline-start">{d.moment}</div>}
					{d.icon && <div className="timeline-middle">{d.icon}</div>}
					{d.description && (
						<div className="timeline-end timeline-box">{d.description}</div>
					)}
					{i !== nodes.length - 1 && <hr className={clsx(d.className)} />}
				</li>
			))}
		</ul>
	);
}
