import { Rating } from "@rtdui/core";

export default function RatingCustomColorDemo() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Rating defaultValue={2} slots={{ star: "bg-primary" }} />
      <Rating defaultValue={2} slots={{ star: "bg-info" }} />
      <Rating defaultValue={2} slots={{ star: "bg-yellow-400" }} />
      <Rating defaultValue={2} slots={{ star: "bg-purple-500" }} />
      <Rating defaultValue={2} slots={{ star: "bg-pink-500" }} />
      <Rating defaultValue={2} slots={{ star: "bg-primary" }} />
    </div>
  );
}
