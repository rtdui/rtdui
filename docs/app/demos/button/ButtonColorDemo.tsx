import { Button, Divider } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-4">
      <Divider>default</Divider>
      <div className="flex flex-wrap gap-4">
        <Button>default</Button>
        <Button color="neutral">neutral</Button>
        <Button color="primary">primary</Button>
        <Button color="secondary">secondary</Button>
        <Button color="accent">accent</Button>
        <Button color="info">info</Button>
        <Button color="warning">warning</Button>
        <Button color="success">success</Button>
        <Button color="error">error</Button>
      </div>
      <Divider>bordered</Divider>
      <div className="flex flex-wrap gap-4">
        <Button outline>default</Button>
        <Button outline color="neutral">
          neutral
        </Button>
        <Button outline color="primary">
          primary
        </Button>
        <Button outline color="secondary">
          secondary
        </Button>
        <Button outline color="accent">
          accent
        </Button>
        <Button outline color="info">
          info
        </Button>
        <Button outline color="warning">
          warning
        </Button>
        <Button outline color="success">
          success
        </Button>
        <Button outline color="error">
          error
        </Button>
      </div>
    </div>
  );
}
