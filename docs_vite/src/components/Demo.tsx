import { useOutletContext } from "react-router-dom";
import { IconCode } from "@tabler/icons-react";
import { CodeHighlight } from "@rtdui/code-highlight";
import clsx from "clsx";

interface DemoData {
  Component?: React.ElementType<any>;
}
interface DemoProps {
  data?: DemoData;
  notProse?: boolean;
}
export default function Demo(props: DemoProps) {
  const { data = {}, notProse = true } = props;
  const { Component } = data;
  const componentName = ((Component as any).name as string).split("_")[0];

  const codes = useOutletContext() as any[];
  return (
    <div
      className={clsx(
        "demo border border-base-300 rounded-md grid overflow-hidden leading-tight"
      )}
    >
      <div
        className={clsx(
          "demo-preview p-4 max-w-full overflow-auto bg-[radial-gradient(theme(colors.base-300)_1px,transparent_0)] bg-[length:6px_6px]",
          {
            "not-prose": notProse,
          }
        )}
      >
        {Component && <Component />}
      </div>
      <div className="demo-toolbar not-prose collapse rounded-none">
        <input type="checkbox" className="min-h-0 w-5 mr-2 justify-self-end" />
        <div className="collapse-title flex justify-end items-center p-2 min-h-0 bg-base-200 text-base-content !cursor-auto">
          <IconCode size={20} />
        </div>
        <div className="collapse-content !p-0 max-w-full overflow-auto relative">
          <CodeHighlight
            code={codes.find((d) => d.name === componentName)?.code ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
