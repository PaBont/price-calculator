import type Data from './data';
import type SelectableItemCategory from './selectable-item-category';

export default interface AppData extends Data {
    readonly itemCategories: readonly SelectableItemCategory[];
    readonly overhead: number;
    readonly addition: number;
    readonly discount: number;
    readonly selectedMultiplierIndex: number;
}
