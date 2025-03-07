import { Button } from "@rtdui/core";
import { IconBell } from "@tabler/icons-react";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center gap-4">
				<Button color="primary" shape="square">
					X
				</Button>
				<Button color="secondary" outline shape="square">
					X
				</Button>
				<Button color="secondary" shape="circle">
					X
				</Button>
				<Button color="secondary" outline shape="circle">
					X
				</Button>
				<Button color="accent" shape="square">
					<IconBell />
				</Button>
				<Button color="accent" outline shape="square">
					<IconBell />
				</Button>
				<Button color="info" shape="circle">
					<IconBell />
				</Button>
				<Button color="info" outline shape="circle">
					<IconBell />
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<Button color="secondary" shape="square" size="lg">
					<IconBell size={32} />
				</Button>
				<Button color="secondary" shape="square" size="md">
					<IconBell size={24} />
				</Button>
				<Button color="secondary" shape="square" size="sm">
					<IconBell size={20} />
				</Button>
				<Button color="secondary" shape="square" size="xs">
					<IconBell size={16} />
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<Button color="accent" shape="circle" size="lg">
					<IconBell size={32} />
				</Button>
				<Button color="accent" shape="circle" size="md">
					<IconBell size={24} />
				</Button>
				<Button color="accent" shape="circle" size="sm">
					<IconBell size={20} />
				</Button>
				<Button color="accent" shape="circle" size="xs">
					<IconBell size={16} />
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<Button shape="square" ghost size="lg">
					<IconBell size={32} />
				</Button>
				<Button shape="square" ghost size="md">
					<IconBell size={24} />
				</Button>
				<Button shape="square" ghost size="sm">
					<IconBell size={20} />
				</Button>
				<Button shape="square" ghost size="xs">
					<IconBell size={16} />
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<Button shape="circle" ghost size="lg">
					<IconBell size={32} />
				</Button>
				<Button shape="circle" ghost size="md">
					<IconBell size={24} />
				</Button>
				<Button shape="circle" ghost size="sm">
					<IconBell size={20} />
				</Button>
				<Button shape="circle" ghost size="xs">
					<IconBell size={16} />
				</Button>
			</div>
		</div>
	);
}
Demo.displayName = "ButtonSharpDemo";
