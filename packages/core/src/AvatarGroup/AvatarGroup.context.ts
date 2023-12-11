import { createOptionalContext } from "../utils";

export interface AvatarGroupContextValue {
  size?: "xs" | "sm" | "md" | "lg";
}

export const [AvatarGroupProvider, useAvatarGroupContext] =
  createOptionalContext<AvatarGroupContextValue>();
