import { NumberInput } from "@rtdui/core";

export default function Demo() {
	return <NumberInput allowNegative={false} placeholder="不允许负数" />;
}
Demo.displayName = "NumberInputPositiveDemo";
