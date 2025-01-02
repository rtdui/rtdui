import { IconInfoCircle } from "@tabler/icons-react";
import { StatPanel } from "@rtdui/core";

const items = [
	{
		figure: <IconInfoCircle />,
		title: "Total Page Views",
		value: "89,400",
		desc: "21% more than last month",
	},
	{
		figure: <IconInfoCircle />,
		title: "Total Likes",
		value: "25.6K",
		desc: "21% more than last month",
	},
	{
		figure: <IconInfoCircle />,
		title: "Downloads",
		value: "31K",
		desc: "Jan 1st - Feb 1st",
	},
];

export default function Demo() {
	return (
		<StatPanel
			items={items}
			slots={{
				figure: "text-primary",
				title: "text-xl",
				value: "text-secondary",
				desc: "text-sm",
			}}
		/>
	);
}
Demo.displayName = "StatPanelSlotsDemo";
