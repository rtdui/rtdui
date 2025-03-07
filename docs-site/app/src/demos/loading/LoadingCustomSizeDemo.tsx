import { Loading } from "@rtdui/core";

export default function Demo() {
	return (
		<>
			<Loading
				variant="infinity"
				color="primary"
				style={
					{
						"--size-selector": "2rem",
					} as React.CSSProperties
				}
			/>
		</>
	);
}
Demo.displayName = "LoadingBallDemo";
