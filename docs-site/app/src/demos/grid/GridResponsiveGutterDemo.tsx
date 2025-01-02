import { Grid } from "@rtdui/core";

export default function Demo() {
	return (
		<Grid gutter={{ base: "4px", md: "16px", lg: "48px" }}>
			<Grid.Col span={4}>
				<div className="bg-sky-100 text-sky-600 text-center p-4">1</div>
			</Grid.Col>
			<Grid.Col span={4}>
				<div className="bg-sky-100 text-sky-600 text-center p-4">2</div>
			</Grid.Col>
			<Grid.Col span={4}>
				<div className="bg-sky-100 text-sky-600 text-center p-4">3</div>
			</Grid.Col>
		</Grid>
	);
}
Demo.displayName = "GridResponsiveGutterDemo";
