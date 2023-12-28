import { isArray } from '../common/typeguards';
import type Item from './item';
import { isItem, readItem } from './item';

export default interface ItemCategory {
    readonly name: string;
    readonly items: readonly Item[];
}

export function isItemCategory(value: any): value is ItemCategory {
    if (typeof value !== 'object') {
        return false;
    }

    if (typeof value.name !== 'string') {
        return false;
    }

    if (!isArray(isItem, value.items)) {
        return false;
    }

    return true;
}

export function readItemCategory(value: any): ItemCategory {
    const itemCategory: Partial<ItemCategory> = typeof value === 'object' ? value : {};

    const name = typeof itemCategory.name === 'string' ? itemCategory.name : '';
    const items = Array.isArray(itemCategory.items) ? itemCategory.items.map(readItem) : [];

    return {
        ...itemCategory,
        name,
        items,
    };
}
