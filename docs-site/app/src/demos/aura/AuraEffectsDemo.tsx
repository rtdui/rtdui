import { Aura, Button } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex items-start gap-3">
      <Aura effect="dual">
        <Button>dual</Button>
      </Aura>
      <Aura effect="glow">
        <Button>glow</Button>
      </Aura>
      <Aura effect="holo">
        <Button>holo</Button>
      </Aura>
      <Aura effect="gold">
        <Button>gold</Button>
      </Aura>
      <Aura effect="silver">
        <Button>silver</Button>
      </Aura>
      <Aura effect="rainbow">
        <Button>rainbow</Button>
      </Aura>
    </div>
  );
}
Demo.displayName = "AuraEffectsDemo";
