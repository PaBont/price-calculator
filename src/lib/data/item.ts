import { isArray } from '../common/typeguards';
import type ItemOption from './item-option';
import { isItemOption, readItemOption } from './item-option';

interface ItemBase {
    readonly name: string;
    readonly isAffectedByMultiplier?: boolean;
}

export interface SingleItem extends ItemBase {
    readonly price: number;
}

export interface MultiItem extends ItemBase {
    readonly price: readonly ItemOption[];
}

type Item = SingleItem | MultiItem;

export function isSingleItem(item: Item): item is SingleItem {
    return typeof item.price === 'number';
}

export function isMultiItem(item: Item): item is MultiItem {
    return !isSingleItem(item);
}

export function isItem(value: any): value is Item {
    if (typeof value !== 'object') {
        return false;
    }

    if (typeof value.name !== 'string') {
        return false;
    }

    const hasPrice = typeof value.price === 'number';
    const hasPrices = isArray(isItemOption, value.price);
    if ((hasPrice && hasPrices) || (!hasPrice && !hasPrices)) {
        return false;
    }

    if (typeof value.isAffectedByMultiplier !== 'undefined' && typeof value.isAffectedByMultiplier !== 'boolean') {
        return false;
    }

    return true;
}

export function readItem(value: any): Item {
    const item: Partial<Item> = typeof value === 'object' ? value : {};

    const name = typeof item.name === 'string' ? item.name : '';
    const isAffectedByMultiplier =
        typeof item.isAffectedByMultiplier === 'boolean' ? item.isAffectedByMultiplier : false;
    const price = Array.isArray(item.price)
        ? item.price.map(readItemOption)
        : typeof item.price === 'number'
        ? item.price
        : 0;

    if (typeof price === 'number') {
        return {
            ...item,
            name,
            isAffectedByMultiplier,
            price,
        };
    } else {
        return {
            ...item,
            name,
            isAffectedByMultiplier,
            price,
        };
    }
}

export type { Item as default };
