import clsx from "clsx";
import { useMdEditorContext } from "./context";

export type ToolbarOwnProps = {};
export type ToolbarProps = ToolbarOwnProps &
  Omit<React.ComponentProps<"div">, keyof ToolbarOwnProps>;

export function Toolbar(props: ToolbarProps) {
  const { ref, ...other } = props;

  const { editorView, toolbars = [] } = useMdEditorContext();

  return (
    <div ref={ref} {...other}>
      {toolbars.map((d, i) => {
        switch (d.type) {
          case "single":
            return (
              <button
                key={i}
                type="button"
                title={d.title!}
                onClick={(e) => d.click(e, { editor: editorView })}
                className={clsx("btn btn-xs btn-ghost btn-square", {
                  "text-info": d.active,
                })}
              >
                {d.icon}
              </button>
            );
          case "multiple":
            return (
              <div key={i} className="dropdown leading-none">
                <div
                  tabIndex={0}
                  className="btn btn-xs btn-ghost btn-square"
                  title={d.title}
                >
                  {d.icon}
                </div>
                <ul className="dropdown-content menu menu-xs bg-base-100 rounded-md z-50 w-max m-0">
                  {d.actions.map((dd) => (
                    <li key={dd.title} className="p-0 m-0">
                      <button
                        type="button"
                        onClick={(e) => dd.click(e, { editor: editorView })}
                      >
                        {dd.icon} {dd.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "space":
            return <div key={i} className="flex-1" />;
          default:
            break;
        }
      })}
    </div>
  );
}
