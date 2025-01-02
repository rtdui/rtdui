import React from "react";

function getSnapshot() {
	return navigator.onLine;
}

function getServerSnapshot() {
	return true; // Always show "Online" for SSR
}

function subscribe(callback: () => void) {
	window.addEventListener("online", callback);
	window.addEventListener("offline", callback);
	return () => {
		window.removeEventListener("online", callback);
		window.removeEventListener("offline", callback);
	};
}

/**
 * 使用React v18中的useSyncExternalStore钩子实现
 * useSyncExternalStore钩子的目的是订阅到React外部的存储
 * @returns
 */
export function useOnlineStatus() {
	const isOnline = React.useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);
	return isOnline;
}
