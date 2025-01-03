import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import rtdui from "@rtdui/tailwind-plugin";

export default {
	darkMode: [
		"variant", // 使用多方案策略
		[
			"@media (prefers-color-scheme: dark) { & }", // 媒介查询方案, &代表dark变体的CSS类, 此输出与darkMode: "media"的输出相同
			'&:where([data-theme="dark"], [data-theme="dark"] *)', // CSS选择器方案, &代表dark变体的CSS类, 此输出与darkMode: ["selector", '[data-theme="dark"]']的输出相同
		],
	],
	content: ["./app/**/*.{tsx,ts,jsx.js}", "../packages/*/src/**/*.{ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [typography, daisyui, rtdui],
	/** daisyUI config (optional) */
	daisyui: {
		themes: true, // false(默认)只包含light和dark主题; true包含所有主题; 空数组[]不包含任何主题
		// darkMode: "dark", // "prefers-color-scheme: dark" 媒介匹配且没有指定data-theme时使用的主题键名, 默认为 "dark"
		logs: false, //禁用日志
	},
} satisfies Config;
