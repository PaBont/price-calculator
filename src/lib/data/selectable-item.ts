import type { MultiItem, SingleItem } from './item';

export interface SelectableSingleItem extends SingleItem {
    readonly isSelected: boolean;
    readonly isAffectedByMultiplier: boolean;
}

export interface SelectableMultiItem extends MultiItem {
    readonly selectedIndex: number;
    readonly isAffectedByMultiplier: boolean;
}

type SelectableItem = SelectableSingleItem | SelectableMultiItem;

export type { SelectableItem as default };
