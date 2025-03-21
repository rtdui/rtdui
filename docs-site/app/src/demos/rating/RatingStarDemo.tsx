import { Rating } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4 items-start">
			<Rating defaultValue={2} />
			<Rating defaultValue={2} star="star" />
			<Rating defaultValue={2} star="heart" />
		</div>
	);
}
Demo.displayName = "RatingStarDemo";
