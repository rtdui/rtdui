import { NativeSelect } from "@rtdui/core";

const data = [
  {
    group: "Frontend libraries",
    items: [
      { label: "React", value: "react" },
      { label: "Angular", value: "angular" },
      { label: "Vue", value: "vue", disabled: true },
    ],
  },
  {
    group: "Backend libraries",
    items: [
      { label: "Express", value: "express" },
      { label: "Koa", value: "koa" },
      { label: "Django", value: "django" },
    ],
  },
];

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <NativeSelect data={data} color="neutral" />
      <NativeSelect data={data} color="primary" />
      <NativeSelect data={data} color="secondary" />
      <NativeSelect data={data} color="accent" />
      <NativeSelect data={data} color="info" />
      <NativeSelect data={data} color="warning" />
      <NativeSelect data={data} color="success" />
      <NativeSelect data={data} color="error" />
    </div>
  );
}
Demo.displayName = "NativeSelectColorDemo";
