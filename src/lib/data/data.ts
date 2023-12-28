import { isArray } from '../common/typeguards';
import type ItemCategory from './item-category';
import { isItemCategory, readItemCategory } from './item-category';
import type Multiplier from './multiplier';
import { isMultiplier, readMultiplier } from './multiplier';

export default interface Data {
    readonly itemCategories: readonly ItemCategory[];
    readonly defaultOverhead: number;
    readonly multipliers: readonly Multiplier[];
}

export function isData(value: any): value is Data {
    if (typeof value !== 'object') {
        return false;
    }

    if (!isArray(isItemCategory, value.itemCategories)) {
        return false;
    }

    if (typeof value.defaultOverhead !== 'number') {
        return false;
    }

    if (!isArray(isMultiplier, value.multipliers)) {
        return false;
    }

    return true;
}

export function readData(value: any): Data {
    const data: Partial<Data> = typeof value === 'object' ? value : {};

    const itemCategories = Array.isArray(data.itemCategories) ? data.itemCategories.map(readItemCategory) : [];
    const defaultOverhead = typeof data.defaultOverhead === 'number' ? data.defaultOverhead : 0;
    const multipliers = Array.isArray(data.multipliers) ? data.multipliers.map(readMultiplier) : [];

    return {
        ...data,
        itemCategories,
        defaultOverhead,
        multipliers,
    };
}
