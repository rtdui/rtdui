import { Rating } from "@rtdui/core";

export default function RatingBasicDemo() {
  return <Rating defaultValue={2} slots={{ star: "bg-primary" }} />;
}
