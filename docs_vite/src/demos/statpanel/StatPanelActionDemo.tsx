import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { StatPanel, Button } from "@rtdui/core";

export default function StatPanelActionDemo() {
  const handleActionClick = (val: any) => {
    ref.current.innerText = val;
  };
  const items = [
    {
      figure: <IconInfoCircle />,
      title: "Total Page Views",
      value: "89,400",
      desc: "21% more than last month",
      actions: (
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            color="primary"
            onClick={(e) => handleActionClick("基础款")}
          >
            基础款
          </Button>
          <Button
            size="sm"
            color="secondary"
            onClick={(e) => handleActionClick("专业款")}
          >
            专业款
          </Button>
        </div>
      ),
    },
    {
      figure: <IconInfoCircle />,
      title: "Total Likes",
      value: "25.6K",
      desc: "21% more than last month",
    },
    {
      figure: <IconInfoCircle />,
      title: "Downloads",
      value: "31K",
      desc: "Jan 1st - Feb 1st",
    },
  ];

  const ref = React.useRef<HTMLSpanElement>(null!);

  return (
    <>
      <StatPanel items={items} />
      <div>
        console: <span ref={ref}></span>
      </div>
    </>
  );
}
