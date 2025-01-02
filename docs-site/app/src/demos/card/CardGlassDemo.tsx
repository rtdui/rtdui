import { Button, Card } from "@rtdui/core";

export default function Demo() {
	return (
		<div
			className="flex justify-center p-8"
			style={{
				backgroundImage: "url(/bg.jpg)",
				backgroundSize: "cover",
			}}
		>
			<Card
				glass
				className="w-96"
				imageSrc="/shoe.jpg"
				title="Shoes!"
				content="If a dog chews shoes whose shoes does he choose?"
				action={<Button color="primary">Buy Now</Button>}
			/>
		</div>
	);
}
Demo.displayName = "CardGlassDemo";
