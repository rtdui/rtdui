import { useEffect } from "react";
import { useModalContext } from "./context";

export function useModalBodyId() {
	const ctx = useModalContext();

	useEffect(() => {
		ctx.setBodyMounted(true);
		return () => ctx.setBodyMounted(false);
	}, []);

	return ctx.getBodyId();
}
