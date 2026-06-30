import { Aura, Button } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex items-center gap-3">
      <Aura size="xs">
        <Button>xs</Button>
      </Aura>
      <Aura size="sm">
        <Button>sm</Button>
      </Aura>
      <Aura size="md">
        <Button>md(默认)</Button>
      </Aura>
      <Aura size="lg">
        <Button>lg</Button>
      </Aura>
      <Aura size="xl">
        <Button>xl</Button>
      </Aura>
    </div>
  );
}
Demo.displayName = "AuraSizeDemo";
