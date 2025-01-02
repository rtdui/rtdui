import { Button } from "@rtdui/core";

export default function Demo() {
	return (
		<div
			className="flex justify-center items-center w-56 h-56"
			style={{
				backgroundImage: "url(/photo-1609621838510-5ad474b7d25d.jpg)",
			}}
		>
			<Button glass>Button</Button>
		</div>
	);
}
Demo.displayName = "ButtonGlassDemo";
