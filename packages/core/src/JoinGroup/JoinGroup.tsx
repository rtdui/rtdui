import clsx from "clsx";

export interface JoinGroupProps extends React.ComponentProps<"div"> {
  className?: string;
  /** ReactElements */
  children?: React.ReactNode;
}
export function JoinGroup(props: JoinGroupProps) {
  const { ref, className, children } = props;

  return (
    <div className={clsx("join", className)} ref={ref}>
      {/* {React.Children.map(children, (d) =>
          React.isValidElement(d)
            ? React.cloneElement<any>(d, { className: "join-item" })
            : d
        )} */}
      {children}
    </div>
  );
}
