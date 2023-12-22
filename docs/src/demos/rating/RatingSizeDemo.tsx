import { Rating } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Rating size="xs" defaultValue={2} />
      <Rating size="sm" defaultValue={2} />
      <Rating size="md" defaultValue={2} />
      <Rating size="lg" defaultValue={2} />
    </div>
  );
}
Demo.displayName = "RatingSizeDemo";
