export interface RichTextEditorControlsGroupProps extends React.ComponentProps<"div"> {}

export function ControlsGroup(props: RichTextEditorControlsGroupProps) {
  const { ref, className, children, ...others } = props;

  return (
    <div className="join" ref={ref} {...others}>
      {children}
    </div>
  );
}
