import React from "react";
import { Loading } from "@rtdui/core";

export default function Demo() {
	return (
		<>
			<div className="flex gap-4">
				<Loading size="xl" variant="ring-3" />
				<Loading size="lg" variant="ring-3" />
				<Loading size="md" variant="ring-3" />
				<Loading size="sm" variant="ring-3" />
				<Loading size="xs" variant="ring-3" />
			</div>
			<div className="flex gap-4">
				<Loading size="lg" variant="ring-3" color="primary" />
				<Loading size="lg" variant="ring-3" color="secondary" />
				<Loading size="lg" variant="ring-3" color="accent" />
				<Loading size="lg" variant="ring-3" color="info" />
				<Loading size="lg" variant="ring-3" color="success" />
				<Loading size="lg" variant="ring-3" color="warning" />
				<Loading size="lg" variant="ring-3" color="error" />
			</div>
		</>
	);
}
Demo.displayName = "LoadingRingDemo";
