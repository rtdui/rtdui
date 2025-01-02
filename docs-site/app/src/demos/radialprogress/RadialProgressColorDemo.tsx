import React from "react";
import { RadialProgress } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4 items-center">
			<RadialProgress value={10} color="primary" />
			<RadialProgress value={20} color="secondary" />
			<RadialProgress value={30} color="accent" />
			<RadialProgress value={40} color="info" />
			<RadialProgress value={50} color="success" />
			<RadialProgress value={60} color="warning" />
			<RadialProgress value={70} color="error" />
		</div>
	);
}
Demo.displayName = "RadialProgressColorDemo";
