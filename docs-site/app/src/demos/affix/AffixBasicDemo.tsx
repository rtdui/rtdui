import { useWindowScroll } from "@rtdui/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import { Affix, Button } from "@rtdui/core";

export default function Demo() {
	const [scroll, scrollTo] = useWindowScroll();
	return (
		<div style={{ height: 1000 }}>
			Affix is located at the bottom of the screen, scroll to see it
			<Affix>
				<Button
					color="primary"
					startIcon={<IconArrowUp />}
					onClick={() => scrollTo({ y: 0 })}
				>
					Scroll to top
				</Button>
			</Affix>
		</div>
	);
}
Demo.displayName = "AffixBasicDemo";
