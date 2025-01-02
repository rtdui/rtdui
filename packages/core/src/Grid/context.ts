import { createSafeContext } from "../utils";

export interface GridContextValue {
	columns: number;
	grow: boolean;
}

export const [GridProvider, useGridContext] =
	createSafeContext<GridContextValue>("Grid Context was not found in tree");
