import { JoinGroup, Button } from "@rtdui/core";

export default function Demo() {
  return (
    <JoinGroup>
      <Button className="join-item">a</Button>
      <Button className="join-item">b</Button>
      <Button className="join-item">c</Button>
    </JoinGroup>
  );
}
Demo.displayName = "JoinGroupButtonsDemo";
