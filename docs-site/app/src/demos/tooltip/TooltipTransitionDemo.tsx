import { Tooltip, Button } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4 pt-8 lg:flex-row ">
			<Tooltip tip="fade" transition="fade">
				<Button>按钮</Button>
			</Tooltip>
			<Tooltip tip="expand" transition="expand">
				<Button>按钮</Button>
			</Tooltip>
			<Tooltip tip="scale" transition="scale">
				<Button>按钮</Button>
			</Tooltip>
			<Tooltip tip="pop" transition="pop">
				<Button>按钮</Button>
			</Tooltip>
			<Tooltip tip="skew-up" transition="skew-up">
				<Button>按钮</Button>
			</Tooltip>
			<Tooltip tip="rotate-left" transition="rotate-left">
				<Button>按钮</Button>
			</Tooltip>
			<Tooltip tip="slide-up" transition="slide-up">
				<Button>按钮</Button>
			</Tooltip>
		</div>
	);
}
Demo.displayName = "TooltipTransitionDemo";
