export default {
	plugins: {
		"postcss-import": {},
		"tailwindcss/nesting": {},
		tailwindcss: { config: "./packages/core/tailwind.config.js" }, // monorepo情况下, 需要指定基于$PWD的路径
		autoprefixer: {},
	},
};
