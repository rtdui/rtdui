import { Button, Divider } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center gap-4">
				<Button noAnimation>button</Button>
				<Button color="primary" noAnimation>
					button
				</Button>
				<Button outline color="primary" noAnimation>
					button
				</Button>
				<Button ghost color="primary" noAnimation>
					button
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<Button sharp="circle" noAnimation>
					A
				</Button>
				<Button color="secondary" sharp="circle" noAnimation>
					A
				</Button>
				<Button color="secondary" outline sharp="circle" noAnimation>
					A
				</Button>
				<Button color="secondary" ghost sharp="circle" noAnimation>
					A
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<Button sharp="square" noAnimation>
					A
				</Button>
				<Button color="accent" sharp="square" noAnimation>
					A
				</Button>
				<Button color="accent" outline sharp="square" noAnimation>
					A
				</Button>
				<Button color="accent" ghost sharp="square" noAnimation>
					A
				</Button>
			</div>
		</div>
	);
}
Demo.displayName = "ButtonNoAnimationDemo";
