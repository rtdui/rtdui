import React from "react";
import { Popover, Button, TextInput } from "@rtdui/core";

export default function () {
  return (
    <Popover focusTrap>
      <Popover.Trigger>
        <Button>popover</Button>
      </Popover.Trigger>
      <Popover.Dropdown>
        <form className="flex flex-col gap-4 bg-base-200 w-80 p-8 rounded-box">
          <div className="flex justify-center items-center text-lg p-2">
            登录
          </div>
          <TextInput label="UserName" />
          <TextInput label="Password" />
          <Button color="primary" className="mt-4">
            Submit
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}
