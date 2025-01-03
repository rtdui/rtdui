import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import path from "node:path";
import fs from "fs-extra";

// export default flatRoutes() satisfies RouteConfig;

const demoRoutes = fs.readdirSync(path.resolve("app/src/demos")).map((d) => ({
	route: d,
	file: `src/demos/${d}/doc.mdx`,
}));

async function routes() {
	const fsRoutes = flatRoutes();
	const adapterRoutes = remixRoutesOptionAdapter((defineRoutes) => {
		return defineRoutes((route) => {
			route("", "routes/_layout.tsx", { id: "demos" }, () => {
				demoRoutes.forEach((d) => {
					route(`components/${d.route}`, d.file);
				});
			});
		});
	});

	return [...(await fsRoutes), ...(await adapterRoutes)] satisfies RouteConfig;
}

export default routes() satisfies RouteConfig;
