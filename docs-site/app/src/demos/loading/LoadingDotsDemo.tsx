import React from "react";
import { Loading } from "@rtdui/core";

export default function Demo() {
	return (
		<>
			<div className="flex gap-4">
				<Loading size="xl" variant="dots" />
				<Loading size="lg" variant="dots" />
				<Loading size="md" variant="dots" />
				<Loading size="sm" variant="dots" />
				<Loading size="xs" variant="dots" />
			</div>
			<div className="flex gap-4">
				<Loading size="lg" variant="dots" color="primary" />
				<Loading size="lg" variant="dots" color="secondary" />
				<Loading size="lg" variant="dots" color="accent" />
				<Loading size="lg" variant="dots" color="info" />
				<Loading size="lg" variant="dots" color="success" />
				<Loading size="lg" variant="dots" color="warning" />
				<Loading size="lg" variant="dots" color="error" />
			</div>
		</>
	);
}
Demo.displayName = "LoadingDotsDemo";
