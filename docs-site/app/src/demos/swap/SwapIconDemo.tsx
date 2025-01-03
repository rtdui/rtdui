import { Swap } from "@rtdui/core";
import { IconVolume3 as IconVolumeMute, IconVolume } from "@tabler/icons-react";

export default function Demo() {
	return (
		<Swap>
			<IconVolumeMute size={36} />
			<IconVolume size={36} />
		</Swap>
	);
}
Demo.displayName = "SwapIconDemo";
