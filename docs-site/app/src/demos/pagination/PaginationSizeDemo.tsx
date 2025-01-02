import { Pagination } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4 items-start">
			<Pagination size="xs" count={10} />
			<Pagination
				size="xs"
				count={10}
				showPrevButton={false}
				showNextButton={false}
			/>
			<Pagination
				size="xs"
				count={10}
				showFirstButton={false}
				showLastButton={false}
				showPrevButton={false}
				showNextButton={false}
			/>

			<Pagination size="sm" count={10} />
			<Pagination
				size="sm"
				count={10}
				showPrevButton={false}
				showNextButton={false}
			/>
			<Pagination
				size="sm"
				count={10}
				showFirstButton={false}
				showLastButton={false}
				showPrevButton={false}
				showNextButton={false}
			/>

			<Pagination size="lg" count={10} />
			<Pagination
				size="lg"
				count={10}
				showPrevButton={false}
				showNextButton={false}
			/>
			<Pagination
				size="lg"
				count={10}
				showFirstButton={false}
				showLastButton={false}
				showPrevButton={false}
				showNextButton={false}
			/>
		</div>
	);
}
Demo.displayName = "PaginationSizeDemo";
