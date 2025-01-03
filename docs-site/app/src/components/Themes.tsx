import type React from "react";

const themes = [
	"light",
	"dark",
	"cupcake",
	"bumblebee",
	"emerald",
	"corporate",
	"synthwave",
	"retro",
	"cyberpunk",
	"valentine",
	"halloween",
	"garden",
	"forest",
	"aqua",
	"lofi",
	"pastel",
	"fantasy",
	"wireframe",
	"black",
	"luxury",
	"dracula",
	"cmyk",
	"autumn",
	"business",
	"acid",
	"lemonade",
	"night",
	"coffee",
	"winter",
	"dim", //v4+
	"nord", //v4+
	"sunset", //v4+
];

function Theme(props: { themeName: string }) {
	const { themeName } = props;

	const handleThemeChange = (e: React.MouseEvent, themeName: string) => {
		document.documentElement.dataset.theme = themeName;
		document
			.querySelectorAll(".theme")
			.forEach((d) => d.classList.remove("!outline-base-content"));
		const elem = e.currentTarget as HTMLDivElement;
		elem.classList.add("!outline-base-content");
	};
	return (
		<div
			className="theme border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent"
			onClick={(e) => handleThemeChange(e, themeName)}
		>
			<div
				data-theme={themeName}
				className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
			>
				<div className="grid grid-cols-5 grid-rows-3">
					<div className="bg-base-200 col-start-1 row-span-2 row-start-1" />
					<div className="bg-base-300 col-start-1 row-start-3" />
					<div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
						<div className="font-bold">{themeName}</div>
						<div className="flex flex-wrap gap-1">
							<div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
								<div className="text-primary-content text-sm font-bold">A</div>
							</div>
							<div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
								<div className="text-secondary-content text-sm font-bold">
									A
								</div>
							</div>
							<div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
								<div className="text-accent-content text-sm font-bold">A</div>
							</div>
							<div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
								<div className="text-neutral-content text-sm font-bold">A</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function ThemeList() {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{themes.map((d) => (
				<Theme key={d} themeName={d} />
			))}
		</div>
	);
}
