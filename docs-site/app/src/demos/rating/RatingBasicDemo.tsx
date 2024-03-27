import { Rating } from "@rtdui/core";

export default function Demo() {
  return <Rating defaultValue={2} slots={{ star: "bg-primary" }} />;
}
Demo.displayName = "RatingBasicDemo";
