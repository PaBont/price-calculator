<script lang="ts">
    import type { SelectableSingleItem } from '../../data/selectable-item';
    import { selectItem, unselectItem } from '../../stores/data-store';

    export let item: SelectableSingleItem;
    export let categoryIndex: number;
    export let itemIndex: number;

    $: isSelected = item.isSelected;
    $: price = item.price;

    const onChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) =>
        e.currentTarget.checked ? selectItem(categoryIndex, itemIndex) : unselectItem(categoryIndex, itemIndex);
</script>

<input type="checkbox" checked={isSelected} on:change={onChange} />
<span>({price})</span>

<style>
</style>
