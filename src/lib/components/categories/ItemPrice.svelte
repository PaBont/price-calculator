<script lang="ts">
    import { isSingleItem } from '../../data/item';
    import type SelectableItem from '../../data/selectable-item';

    export let item: SelectableItem;

    $: price = isSingleItem(item)
        ? !item.isSelected
            ? ''
            : item.price
        : item.selectedIndex < 0
          ? ''
          : item.price[item.selectedIndex].price;
</script>

<span>{price}</span>

<style>
</style>
