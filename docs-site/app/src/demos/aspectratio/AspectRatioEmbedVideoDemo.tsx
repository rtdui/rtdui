import { AspectRatio } from "@rtdui/core";

export default function Demo() {
	return (
		<AspectRatio ratio="16/9">
			<video controls>
				<source
					src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
					type="video/webm"
				/>
				<source
					src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
					type="video/mp4"
				/>
			</video>
		</AspectRatio>
	);
}
Demo.displayName = "AspectRatioEmbedVideoDemo";
