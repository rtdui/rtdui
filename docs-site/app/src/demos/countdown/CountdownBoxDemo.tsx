import { Countdown } from "@rtdui/core";

export default function Demo() {
	const now = new Date();
	const end = now.setHours(now.getHours() + 10); // 10小时倒计时
	const endDate = new Date(end);
	return <Countdown endDate={endDate} variant="box" />;
}
Demo.displayName = "CountdownBoxDemo";
