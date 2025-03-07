import { createOptionalContext } from "../utils";
import type { ThemeBaseSize } from "../theme.types";

export interface AvatarGroupContextValue {
	size?: ThemeBaseSize;
}

export const [AvatarGroupProvider, useAvatarGroupContext] =
	createOptionalContext<AvatarGroupContextValue>();
