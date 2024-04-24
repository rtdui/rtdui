import { Button, Card } from "@rtdui/core";
import { useState } from "react";

const outline = "!outline !outline-2 !outline-offset-1 !outline-red-500";

export default function Demo() {
  const [slots, setSlots] = useState({});
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 bg-base-100 rounded-box p-4">
        <Button
          size="sm"
          onClick={() =>
            setSlots({
              figure: outline,
            })
          }
        >
          figure
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setSlots({
              body: outline,
            })
          }
        >
          body
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setSlots({
              title: outline,
            })
          }
        >
          title
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setSlots({
              content: outline,
            })
          }
        >
          content
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setSlots({
              actions: outline,
            })
          }
        >
          actions
        </Button>
      </div>
      <Card
        className="w-96"
        imageSrc="/shoe.jpg"
        title="Shoes!"
        content="If a dog chews shoes whose shoes does he choose?"
        action={<Button color="primary">Buy Now</Button>}
        slots={slots}
      />
    </div>
  );
}
Demo.displayName = "CardSlotsDemo";
