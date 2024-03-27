import { StatPanel, Avatar } from "@rtdui/core";

const items = [
  {
    figure: <Avatar size="lg" src="/photo-1534528741775-53994a69daeb.jpg" />,
    title: <span className="text-xl">Total Page Views</span>,
    value: <span className="text-secondary">89,400</span>,
    desc: <span className="text-sm">21% more than last month</span>,
  },
  {
    figure: (
      <img
        alt="avatar"
        src="/photo-1534528741775-53994a69daeb.jpg"
        width={100}
        height={100}
        className="rounded-box"
      />
    ),
    title: <span className="text-xl">Total Page Views</span>,
    value: <span className="text-secondary">89,400</span>,
    desc: <span className="text-sm">21% more than last month</span>,
  },
];

export default function Demo() {
  return <StatPanel items={items} />;
}
Demo.displayName = "StatPanelItemsDemo";
