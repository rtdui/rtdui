import React from "react";
import { useNavigate } from "@remix-run/react";

function isLinkEvent(event: MouseEvent) {
	if (!(event.target instanceof HTMLElement)) return;
	const a = event.target.closest("a");
	return (
		a && // is anchor or has anchor parent
		!a.hasAttribute("data-noprefetch") && // didn't opt out
		a.hasAttribute("href") && // has an href
		a.origin === window.location.origin && // is same origin
		a
	);
}

export function useDelegatedReactRouterLinks(
	nodeRef: React.RefObject<HTMLElement>,
) {
	const navigate = useNavigate();

	React.useEffect(() => {
		const node = nodeRef.current;
		function handleClick(event: MouseEvent) {
			if (!node) return;
			const a = isLinkEvent(event);
			if (
				a &&
				(!a.target || a.target === "_self") && // Let browser handle "target=_blank" etc.
				event.button === 0 && // left click
				!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) // not modified
			) {
				event.preventDefault();
				const { pathname, search, hash } = a;
				navigate({ pathname, search, hash });
			}
		}
		node?.addEventListener("click", handleClick);
		return () => {
			node?.removeEventListener("click", handleClick);
		};
	}, [navigate, nodeRef]);
}
