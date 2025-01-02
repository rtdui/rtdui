import { Carousel } from "@rtdui/core";

const items = [
	{ imageSrc: "/photo-1625726411847-8cbb60cc71e6.jpg" },
	{ imageSrc: "/photo-1609621838510-5ad474b7d25d.jpg" },
	{ imageSrc: "/photo-1414694762283-acccc27bca85.jpg" },
	{ imageSrc: "/photo-1665553365602-b2fb8e5d1707.jpg" },
];
export default function Demo() {
	return <Carousel items={items} indicator="number" />;
}
Demo.displayName = "CarouselNumberDemo";
