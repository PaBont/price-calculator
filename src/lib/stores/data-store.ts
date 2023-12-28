import { derived, writable } from 'svelte/store';
import { isMultiItem, isSingleItem } from '../data/item';
import type SelectableItem from '../data/selectable-item';
import type Data from '../data/data';
import type AppData from '../data/app-data';

const store = writable<AppData>({
    itemCategories: [],
    defaultOverhead: 0,
    multipliers: [],
    overhead: 0,
    addition: 0,
    discount: 0,
    selectedMultiplierIndex: 0,
});

const multiplierStore = derived<typeof store, { readonly multiplier: number }>(store, (data) => ({
    multiplier: data.multipliers.length === 0 ? 1 : data.multipliers[data.selectedMultiplierIndex].factor,
}));

const itemPriceStore = derived([store, multiplierStore], ([data, multiplierData]) => ({
    ...data,
    ...multiplierData,
    itemCategories: data.itemCategories.map((category) => ({
        ...category,
        items: category.items.map((item) => {
            const itemPrice = isSingleItem(item)
                ? item.isSelected
                    ? item.price
                    : 0
                : item.selectedIndex >= 0
                ? item.price[item.selectedIndex].price
                : 0;
            return {
                ...item,
                multipliedPrice: item.isAffectedByMultiplier ? itemPrice * multiplierData.multiplier : itemPrice,
            };
        }),
    })),
}));

const categoryTotalStore = derived(itemPriceStore, (data) => ({
    ...data,
    itemCategories: data.itemCategories.map((category) => ({
        ...category,
        total: category.items.reduce((sum, item) => sum + item.multipliedPrice, 0),
    })),
}));

const totalStore = derived<typeof categoryTotalStore, { readonly total: number }>(categoryTotalStore, (data) => ({
    total: data.itemCategories.reduce((sum, category) => sum + category.total, 0),
}));

const additionStore = derived<[typeof store, typeof totalStore], { readonly additionTotal: number }>(
    [store, totalStore],
    ([{ addition }, { total }]) => ({
        additionTotal: total * addition,
    })
);

const discountStore = derived<[typeof store, typeof totalStore], { readonly discountTotal: number }>(
    [store, totalStore],
    ([{ discount }, { total }]) => ({
        discountTotal: total * discount,
    })
);

const finalTotalStore = derived<
    [typeof store, typeof totalStore, typeof additionStore, typeof discountStore],
    { readonly finalTotal: number }
>(
    [store, totalStore, additionStore, discountStore],
    ([{ overhead }, { total }, { additionTotal }, { discountTotal }]) => ({
        finalTotal: total + overhead + additionTotal - discountTotal,
    })
);

const appDataStore = derived(
    /*<
    [typeof categoryTotalStore, typeof totalStore, typeof additionStore, typeof discountStore, typeof finalTotalStore],
    AppData & {}
>*/
    [categoryTotalStore, totalStore, additionStore, discountStore, finalTotalStore],
    ([data, total, addition, discount, finalTotal]) => ({
        ...data,
        ...total,
        ...addition,
        ...discount,
        ...finalTotal,
    })
);

const setData = (data: Data) =>
    store.update((storeData) => ({
        ...storeData,
        ...data,
        itemCategories: data.itemCategories.map((category) => ({
            ...category,
            items: category.items.map((item) =>
                isSingleItem(item)
                    ? { ...item, isSelected: false, isAffectedByMultiplier: item.isAffectedByMultiplier ?? false }
                    : { ...item, selectedIndex: -1, isAffectedByMultiplier: item.isAffectedByMultiplier ?? false }
            ),
        })),
        overhead: data.defaultOverhead,
        selectedMultiplierIndex: (() => {
            const index = data.multipliers.findIndex((multiplier) => multiplier.factor === 1);
            return index < 0 ? 0 : index;
        })(),
    }));
const updateItem =
    (update: (item: SelectableItem) => SelectableItem | false) => (categoryIndex: number, itemIndex: number) => {
        if (itemIndex < 0 || categoryIndex < 0) {
            return;
        }

        store.update((data) => {
            if (itemIndex < 0 || categoryIndex < 0 || categoryIndex >= data.itemCategories.length) {
                return data;
            }

            const category = data.itemCategories[categoryIndex];
            if (itemIndex >= category.items.length) {
                return data;
            }
            const item = update(category.items[itemIndex]);
            if (item === false) {
                return data;
            }

            return {
                ...data,
                itemCategories: [
                    ...data.itemCategories.slice(0, categoryIndex),
                    {
                        ...category,
                        items: [...category.items.slice(0, itemIndex), item, ...category.items.slice(itemIndex + 1)],
                    },
                    ...data.itemCategories.slice(categoryIndex + 1),
                ],
            };
        });
    };
const selectItem = updateItem((item) => {
    if (!isSingleItem(item)) {
        return false;
    }

    return { ...item, isSelected: true };
});
const unselectItem = updateItem((item) => {
    if (!isSingleItem(item)) {
        return false;
    }

    return { ...item, isSelected: false };
});
const selectItemOption = (categoryIndex: number, itemIndex: number, optionIndex: number) =>
    updateItem((item) => {
        if (optionIndex < 0 || !isMultiItem(item) || optionIndex >= item.price.length) {
            return false;
        }

        return { ...item, selectedIndex: optionIndex };
    })(categoryIndex, itemIndex);
const unselectItemOption = updateItem((item) => {
    if (!isMultiItem(item)) {
        return false;
    }

    return { ...item, selectedIndex: -1 };
});
const setOverhead = (value: number) => store.update((data) => ({ ...data, overhead: isNaN(value) ? 0 : value }));
const setAddition = (value: number) => store.update((data) => ({ ...data, addition: isNaN(value) ? 0 : value }));
const setDiscount = (value: number) => store.update((data) => ({ ...data, discount: isNaN(value) ? 0 : value }));
const setSelectedMultiplierIndex = (value: number) =>
    store.update((data) => ({ ...data, selectedMultiplierIndex: value }));

export default appDataStore;
export {
    setData,
    selectItem,
    unselectItem,
    selectItemOption,
    unselectItemOption,
    setOverhead,
    setAddition,
    setDiscount,
    setSelectedMultiplierIndex,
};
