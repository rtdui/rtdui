import React from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { Link } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center">
			<Link as="a" href="/">
				native anchor
			</Link>
			<Link as={RouterLink} to="/">
				react-router Link
			</Link>
			<Link as={NavLink} to="/components/link">
				react-router NavLink
			</Link>
		</div>
	);
}

Demo.displayName = "LinkPolymorphicDemo";
