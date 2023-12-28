export default interface ItemOption {
    readonly name: string;
    readonly price: number;
}

export function isItemOption(value: any): value is ItemOption {
    if (typeof value !== 'object') {
        return false;
    }

    if (typeof value.name !== 'string') {
        return false;
    }

    if (typeof value.price !== 'number') {
        return false;
    }

    return true;
}

export function readItemOption(value: any): ItemOption {
    const itemOption: Partial<ItemOption> = typeof value === 'object' ? value : {};

    const name: string = typeof itemOption.name === 'string' ? itemOption.name : '';
    const price: number = typeof itemOption.price === 'number' ? itemOption.price : 0;

    return {
        ...itemOption,
        name,
        price,
    };
}
