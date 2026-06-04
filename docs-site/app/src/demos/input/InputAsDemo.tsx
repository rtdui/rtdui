import { Input } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      as 为 button
      <Input as="button" className="w-56" />
      as 为 select
      <Input as="select" pointer className="w-56">
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </div>
  );
}

Demo.displayName = "InputAsDemo";
