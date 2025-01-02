import React from "react";
import { Loading } from "@rtdui/core";

export default function Demo() {
	return (
		<>
			<div className="flex gap-4">
				<Loading size="lg" variant="ring" />
				<Loading size="md" variant="ring" />
				<Loading size="sm" variant="ring" />
				<Loading size="xs" variant="ring" />
			</div>
			<div className="flex gap-4">
				<Loading size="lg" variant="ring" color="primary" />
				<Loading size="lg" variant="ring" color="secondary" />
				<Loading size="lg" variant="ring" color="accent" />
				<Loading size="lg" variant="ring" color="info" />
				<Loading size="lg" variant="ring" color="success" />
				<Loading size="lg" variant="ring" color="warning" />
				<Loading size="lg" variant="ring" color="error" />
			</div>
		</>
	);
}
Demo.displayName = "LoadingRingDemo";
