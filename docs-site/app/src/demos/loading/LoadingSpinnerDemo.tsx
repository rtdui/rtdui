import React from "react";
import { Loading } from "@rtdui/core";

export default function Demo() {
	return (
		<>
			<div className="flex gap-4">
				<Loading size="xl" />
				<Loading size="lg" />
				<Loading size="md" />
				<Loading size="sm" />
				<Loading size="xs" />
			</div>
			<div className="flex gap-4">
				<Loading size="lg" color="primary" />
				<Loading size="lg" color="secondary" />
				<Loading size="lg" color="accent" />
				<Loading size="lg" color="info" />
				<Loading size="lg" color="success" />
				<Loading size="lg" color="warning" />
				<Loading size="lg" color="error" />
			</div>
		</>
	);
}
Demo.displayName = "LoadingSpinnerDemo";
