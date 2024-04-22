import { Input } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="bg-base-100 p-4">
      <div className="flex items-center gap-2">
        <Input.Label required>label</Input.Label>
        <Input as="button" className="w-64" slots={{ input: "text-left" }}>
          <Input.Placeholder>Placeholder</Input.Placeholder>
        </Input>
      </div>
      <Input.Description>description</Input.Description>
      <Input.Error>error</Input.Error>
    </div>
  );
}

Demo.displayName = "InputCustomDemo";
