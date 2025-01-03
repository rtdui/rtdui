import { forwardRef } from "react";
import { useUncontrolled } from "@rtdui/hooks";
import { defaultSpotlightFilter } from "./default-spotlight-filter";
import { isActionsGroup } from "./is-actions-group";
import { limitActions } from "./limit-actions";
import { spotlightStore } from "./spotlight.store";
import { SpotlightAction, type SpotlightActionProps } from "./SpotlightAction";
import { SpotlightActionsGroup } from "./SpotlightActionsGroup";
import { SpotlightActionsList } from "./SpotlightActionsList";
import { SpotlightEmpty } from "./SpotlightEmpty";
import { SpotlightFooter } from "./SpotlightFooter";
import { SpotlightRoot, type SpotlightRootProps } from "./SpotlightRoot";
import { SpotlightSearch, type SpotlightSearchProps } from "./SpotlightSearch";

export type SpotlightFilterFunction = (
	query: string,
	actions: SpotlightActions[],
) => SpotlightActions[];

export interface SpotlightActionData extends SpotlightActionProps {
	id: string;
	group?: string;
}

export interface SpotlightActionGroupData {
	group: string;
	actions: SpotlightActionData[];
}

export type SpotlightActions = SpotlightActionData | SpotlightActionGroupData;

export interface SpotlightProps extends SpotlightRootProps {
	/** Props passed down to the `Spotlight.Search` */
	searchProps?: SpotlightSearchProps;

	/** Actions data, passed down to `Spotlight.Action` component */
	actions: SpotlightActions[];

	/** Function to filter actions data based on search query, by default actions are filtered by title, description and keywords */
	filter?: SpotlightFilterFunction;

	/** Message displayed when none of the actions match given `filter` */
	nothingFound?: React.ReactNode;

	/** Determines whether search query should be highlighted in action label
	 * @default false
	 */
	highlightQuery?: boolean;

	/** Maximum number of actions displayed at a time
	 * @default Infinity
	 */
	limit?: number;
}

const defaultProps: Partial<SpotlightProps> = {
	limit: Number.POSITIVE_INFINITY,
	store: spotlightStore,
	filter: defaultSpotlightFilter,
	clearQueryOnClose: true,
	closeOnActionTrigger: true,
	shortcut: "mod + K",
	highlightQuery: false,
};

const Spotlight_ = forwardRef<HTMLDivElement, SpotlightProps>((props, ref) => {
	props = { ...defaultProps, ...props };
	const {
		searchProps,
		filter,
		query,
		onQueryChange,
		actions,
		nothingFound,
		highlightQuery,
		limit,
		...others
	} = props;

	const [_query, setQuery] = useUncontrolled({
		value: query,
		defaultValue: "",
		finalValue: "",
		onChange: onQueryChange,
	});

	const filteredActions = limitActions(filter!(_query, actions), limit!).map(
		(item) => {
			if (isActionsGroup(item)) {
				const items = item.actions.map(({ id, ...actionData }) => (
					<SpotlightAction
						key={id}
						highlightQuery={highlightQuery}
						{...actionData}
					/>
				));

				return (
					<SpotlightActionsGroup key={item.group} label={item.group}>
						{items}
					</SpotlightActionsGroup>
				);
			}

			return (
				<SpotlightAction
					key={item.id}
					highlightQuery={highlightQuery}
					{...item}
				/>
			);
		},
	);

	return (
		<SpotlightRoot
			{...others}
			query={_query}
			onQueryChange={setQuery}
			ref={ref}
		>
			<SpotlightSearch {...searchProps} />
			<SpotlightActionsList>
				{filteredActions}
				{filteredActions.length === 0 && nothingFound && (
					<SpotlightEmpty>{nothingFound}</SpotlightEmpty>
				)}
			</SpotlightActionsList>
		</SpotlightRoot>
	);
});

Spotlight_.displayName = "@rtdui/Spotlight";

export const Spotlight = Object.assign(Spotlight_, {
	Root: SpotlightRoot,
	Search: SpotlightSearch,
	ActionsList: SpotlightActionsList,
	Action: SpotlightAction,
	ActionsGroup: SpotlightActionsGroup,
	Empty: SpotlightEmpty,
	Footer: SpotlightFooter,
});
