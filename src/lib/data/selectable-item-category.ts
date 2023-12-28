import type ItemCategory from './item-category';
import type SelectableItem from './selectable-item';

export default interface SelectableItemCategory extends ItemCategory {
    readonly items: readonly SelectableItem[];
}
