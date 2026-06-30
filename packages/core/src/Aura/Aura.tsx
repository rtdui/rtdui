import clsx from "clsx";
import { ThemeBaseSize } from "../theme.types";

export interface AuraProps extends React.ComponentPropsWithoutRef<"div"> {
  /** 特效 */
  effect?: "dual" | "rainbow" | "holo" | "gold" | "silver" | "glow";
  size?: ThemeBaseSize;
}
export function Aura(props: AuraProps) {
  const { effect, size, children, className, ...other } = props;

  return (
    <div
      {...other}
      className={clsx(
        "aura",
        {
          "aura-dual": effect === "dual",
          "aura-rainbow": effect === "rainbow",
          "aura-holo": effect === "holo",
          "aura-gold": effect === "gold",
          "aura-silver": effect === "silver",
          "aura-glow": effect === "glow",
          "aura-xs": size === "xs",
          "aura-sm": size === "sm",
          "aura-md": size === "md",
          "aura-lg": size === "lg",
          "aura-xl": size === "xl",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
