import { Button } from "@rtdui/core";
import { IconBell } from "@tabler/icons-react";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button color="primary" sharp="square">
          X
        </Button>
        <Button color="secondary" outline sharp="square">
          X
        </Button>
        <Button color="secondary" sharp="circle">
          X
        </Button>
        <Button color="secondary" outline sharp="circle">
          X
        </Button>
        <Button color="accent" sharp="square">
          <IconBell />
        </Button>
        <Button color="accent" outline sharp="square">
          <IconBell />
        </Button>
        <Button color="info" sharp="circle">
          <IconBell />
        </Button>
        <Button color="info" outline sharp="circle">
          <IconBell />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button color="secondary" sharp="square" size="lg">
          <IconBell size={32} />
        </Button>
        <Button color="secondary" sharp="square" size="md">
          <IconBell size={24} />
        </Button>
        <Button color="secondary" sharp="square" size="sm">
          <IconBell size={20} />
        </Button>
        <Button color="secondary" sharp="square" size="xs">
          <IconBell size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button color="accent" sharp="circle" size="lg">
          <IconBell size={32} />
        </Button>
        <Button color="accent" sharp="circle" size="md">
          <IconBell size={24} />
        </Button>
        <Button color="accent" sharp="circle" size="sm">
          <IconBell size={20} />
        </Button>
        <Button color="accent" sharp="circle" size="xs">
          <IconBell size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button sharp="square" ghost size="lg">
          <IconBell size={32} />
        </Button>
        <Button sharp="square" ghost size="md">
          <IconBell size={24} />
        </Button>
        <Button sharp="square" ghost size="sm">
          <IconBell size={20} />
        </Button>
        <Button sharp="square" ghost size="xs">
          <IconBell size={16} />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button sharp="circle" ghost size="lg">
          <IconBell size={32} />
        </Button>
        <Button sharp="circle" ghost size="md">
          <IconBell size={24} />
        </Button>
        <Button sharp="circle" ghost size="sm">
          <IconBell size={20} />
        </Button>
        <Button sharp="circle" ghost size="xs">
          <IconBell size={16} />
        </Button>
      </div>
    </div>
  );
}
Demo.displayName = "ButtonSharpDemo";
