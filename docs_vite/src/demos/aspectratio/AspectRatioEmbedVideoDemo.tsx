import { AspectRatio } from "@rtdui/core";

export default function AspectRatioEmbedVideoDemo() {
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
