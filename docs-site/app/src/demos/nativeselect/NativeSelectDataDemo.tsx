import { NativeSelect } from "@rtdui/core";

export default function Demo() {
	return (
		<NativeSelect
			label="with data prop"
			data={[
				{
					group: "Frontend libraries",
					items: [
						{ label: "React", value: "react" },
						{ label: "Angular", value: "angular" },
						{ label: "Vue", value: "vue", disabled: true },
					],
				},
				{
					group: "Backend libraries",
					items: [
						{ label: "Express", value: "express" },
						{ label: "Koa", value: "koa" },
						{ label: "Django", value: "django" },
					],
				},
			]}
		/>
	);
}
Demo.displayName = "NativeSelectDataDemo";
