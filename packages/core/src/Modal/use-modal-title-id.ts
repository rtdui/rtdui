import { useEffect } from "react";
import { useModalContext } from "./context";

export function useModalTitle() {
	const ctx = useModalContext();

	useEffect(() => {
		ctx.setTitleMounted(true);
		return () => ctx.setTitleMounted(false);
	}, []);

	return ctx.getTitleId();
}
