import React from "react";
import { Link as RemixLink, NavLink } from "@remix-run/react";
import { Link } from "@rtdui/core";

export default function () {
  return (
    <div className="flex gap-4 items-center">
      <Link as="a" href="/">
        native anchor
      </Link>
      <Link as={RemixLink} to="/">
        Remix Link
      </Link>
      <Link as={NavLink} to="/components/link">
        Remix NavLink
      </Link>
    </div>
  );
}
