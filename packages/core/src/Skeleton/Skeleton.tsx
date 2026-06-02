import clsx from "clsx";

export interface SkeletonProps extends React.ComponentProps<"div"> {
  circle?: boolean;
  paragraph?: boolean;
  box?: boolean;
}
export function Skeleton(props: SkeletonProps) {
  const { circle, paragraph, box, className } = props;
  return (
    <div
      className={clsx(
        "animate-pulse bg-neutral-content",
        { "rounded-full": circle || paragraph, "rounded-md": box },
        className,
      )}
    />
  );
}
