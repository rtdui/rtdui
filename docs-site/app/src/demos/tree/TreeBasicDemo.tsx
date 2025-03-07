import React from "react";
import { Tree, Button, Switch, Tooltip } from "@rtdui/core";
import { IconSettings, IconFolder, IconFile } from "@tabler/icons-react";

const MenuItemIcon = (props: any) => {
	const { item } = props;
	return item.children ? (
		<IconFolder strokeWidth={1} size={20} />
	) : (
		<IconFile strokeWidth={1} size={20} />
	);
};
const MenuItemActions = (props: any) => {
	const { item } = props;
	const [, setUpdate] = React.useState({});
	return (
		<>
			<Tooltip tip="配置">
				<Button
					ghost
					size="sm"
					shape="circle"
					onClick={(e) => {
						e.stopPropagation();
						alert(JSON.stringify(item));
					}}
				>
					<IconSettings strokeWidth={1} />
				</Button>
			</Tooltip>
			<Tooltip tip={item.enable ? "已启用" : "已禁用"}>
				<Switch
					color="primary"
					size="sm"
					checked={item.enable ?? false}
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={(checked) => {
						item.enable = checked;
						setUpdate({});
					}}
				/>
			</Tooltip>
		</>
	);
};

const menuData = [
	{
		id: "1",
		label: "1",
		children: [
			{
				id: "1-1",
				label: "1-1",
				children: [
					{
						id: "1-1-1",
						label: "1-1-1",
						enable: true,
					},
					{
						id: "1-1-2",
						label: "1-1-2",
						url: "/",
					},
				],
			},
			{
				id: "1-2",
				label: "1-2",
				children: [
					{
						id: "1-2-1",
						label: "1-2-1",
					},
					{
						id: "1-2-2",
						label: "1-2-2",
						enable: true,
					},
				],
			},
		],
	},
	{
		id: "2",
		label: "2",
		children: [
			{
				id: "2-1",
				label: "2-1",
				children: [
					{
						id: "2-1-1",
						label: "2-1-1",
					},
					{
						id: "2-1-2",
						label: "2-1-2",
					},
				],
			},
			{
				id: "2-2",
				label: "2-2",
				children: [
					{
						id: "2-2-1",
						label: "2-2-1",
						enable: true,
					},
					{
						id: "2-2-2",
						label: "2-2-2",
					},
				],
			},
		],
	},
];

const handleMenuItemClick = (item: any) => {
	if (!item.url) {
		alert(JSON.stringify(item));
	}
};

export default function Demo() {
	return (
		<Tree
			className="bg-base-100 w-full"
			data={menuData}
			displayField="label"
			expandAll
			onItemClick={handleMenuItemClick}
			ItemIconComponent={MenuItemIcon}
			ItemActionsComponent={MenuItemActions}
		/>
	);
}
Demo.displayName = "TreeBasicDemo";
