import React from "react";
import { JionGroup, Button, TextInput, Select, Indicator } from "@rtdui/core";

export default function () {
  return (
    <JionGroup>
      <TextInput
        bordered
        slots={{
          input:
            "join-item focus:outline-offset-[-1px] focus:outline-1 focus:outline-info",
        }}
      />
      <Select
        bordered
        options={["Sci-fi", "Drama", "Action"]}
        slots={{
          input:
            "join-item focus:outline-offset-[-1px] focus:outline-1 focus:outline-info",
        }}
      />
      <Indicator badgeText="new">
        <Button
          size="sm"
          outline
          className="join-item [--tw-border-opacity:.2] border-base-content"
        >
          search
        </Button>
      </Indicator>
    </JionGroup>
  );
}
