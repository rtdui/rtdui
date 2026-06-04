import React from "react";
import { JoinGroup, Button, TextInput, Select, Indicator } from "@rtdui/core";

export default function Demo() {
  return (
    <JoinGroup>
      <TextInput
        slots={{
          input:
            "join-item focus:outline-offset-[-1px] focus:outline-1 focus:outline-info",
        }}
      />
      <TextInput
        slots={{
          input:
            "join-item focus:outline-offset-[-1px] focus:outline-1 focus:outline-info [&]:w-56",
        }}
      />
      <Indicator badgeText="new">
        <Button
          size="sm"
          outline
          className="join-item [--tw-border-opacity:.2] border-base-content bg-base-100"
        >
          search
        </Button>
      </Indicator>
    </JoinGroup>
  );
}
Demo.displayName = "JoinGroupInputsDemo";
