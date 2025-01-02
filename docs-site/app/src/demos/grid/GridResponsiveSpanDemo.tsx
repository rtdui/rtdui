import { Grid } from "@rtdui/core";

export default function Demo() {
	return (
		<Grid>
			<Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, "2xl": 1 }}>
				<div className="bg-sky-100 text-sky-600 text-center p-4">1</div>
			</Grid.Col>
			<Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, "2xl": 1 }}>
				<div className="bg-sky-100 text-sky-600 text-center p-4">2</div>
			</Grid.Col>
			<Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, "2xl": 1 }}>
				<div className="bg-sky-100 text-sky-600 text-center p-4">3</div>
			</Grid.Col>
			<Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, "2xl": 1 }}>
				<div className="bg-sky-100 text-sky-600 text-center p-4">4</div>
			</Grid.Col>
		</Grid>
	);
}
Demo.displayName = "GridResponsiveSpanDemo";
