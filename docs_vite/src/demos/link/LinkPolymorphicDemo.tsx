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
        Remix Link
      </Link>
      <Link as={NavLink} to="/components/link">
        Remix NavLink
      </Link>
    </div>
  );
}
Demo.displayName = "LinkPolymorphicDemo";
