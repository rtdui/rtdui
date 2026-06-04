import { Button, Card } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <Card
        className="w-96 bg-base-200"
        imageSrc="/shoe.jpg"
        title="Shoes!"
        content="If a dog chews shoes whose shoes does he choose?"
        action={<Button color="primary">Buy Now</Button>}
        slots={{
          figure: "p-8",
          body: "items-center",
        }}
      />

      <Card
        className="w-96 bg-success"
        title="Shoes!"
        content="If a dog chews shoes whose shoes does he choose?"
        action={<Button color="primary">Buy Now</Button>}
        slots={{
          body: "items-center text-white",
        }}
      />
    </div>
  );
}
Demo.displayName = "CardCustomStyleDemo";
