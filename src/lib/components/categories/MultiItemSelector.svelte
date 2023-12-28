<script lang="ts">
    import type { SelectableMultiItem } from '../../data/selectable-item';
    import { selectItemOption, unselectItemOption } from '../../stores/data-store';

    export let item: SelectableMultiItem;
    export let categoryIndex: number;
    export let itemIndex: number;

    $: options = item.price;
    $: selectedIndex = item.selectedIndex;

    const onSelectItem = (index: number) => selectItemOption(categoryIndex, itemIndex, index);
    const onUnselectItem = () => unselectItemOption(categoryIndex, itemIndex);
    const onChangeSelection = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
        const index = parseInt(e.currentTarget.value);
        return index < 0 ? onUnselectItem() : onSelectItem(index);
    };
</script>

<select on:change={onChangeSelection}>
    <option value={-1} selected={selectedIndex < 0} on:select={onUnselectItem}></option>
    {#each options as option, index}
        <option value={index} selected={index === selectedIndex} on:select={() => onSelectItem(index)}
            >{option.name} ({option.price})</option
        >
    {/each}
</select>

<style>
    select {
        width: 90%;
    }
</style>
