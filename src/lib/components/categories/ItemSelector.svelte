<script lang="ts">
    import { isSingleItem } from '../../data/item';
    import type SelectableItem from '../../data/selectable-item';
    import MultiItemSelector from './MultiItemSelector.svelte';
    import SingleItemSelector from './SingleItemSelector.svelte';

    export let item: SelectableItem;
    export let categoryIndex: number;
    export let itemIndex: number;
</script>

{#if isSingleItem(item)}
    <SingleItemSelector {item} {categoryIndex} {itemIndex} />
{:else}
    <MultiItemSelector {item} {categoryIndex} {itemIndex} />
{/if}
