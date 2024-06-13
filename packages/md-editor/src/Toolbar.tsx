import clsx from "clsx";
import { forwardRef } from "react";
import { useMdEditorContext } from "./context";

export interface ToolbarOwnProps {}
export type ToolbarProps = ToolbarOwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof ToolbarOwnProps>;

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (props, ref) => {
    const { ...other } = props;

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
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
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
);

Toolbar.displayName = "@rtdui/md-editor/Toolbar";
