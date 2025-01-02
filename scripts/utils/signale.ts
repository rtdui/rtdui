import signale from "signale";

export const createLogger = (scope: string) =>
	new signale.Signale({
		scope,
	});
