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
      <NativeSelect data={data} size="xs" />
      <NativeSelect data={data} size="sm" />
      <NativeSelect data={data} size="md" />
      <NativeSelect data={data} size="lg" />
      <NativeSelect data={data} size="xl" />
    </div>
  );
}
Demo.displayName = "NativeSelectSizeDemo";
