<script lang="ts">
    import { get } from 'svelte/store';
    import ItemSelector from './ItemSelector.svelte';
    import appDataStore from '../../stores/data-store';

    export let categoryIndex: number;

    let { itemCategories, multiplier } = get(appDataStore);
    appDataStore.subscribe((data) => ({ itemCategories, multiplier } = data));

    $: console.log(multiplier);
    $: category = itemCategories[categoryIndex];

    $: name = category.name;
    $: items = category.items;
    $: total = category.total;
</script>

<div class="container">
    <div class="header">
        <span>{name}</span>
        <span>{total === 0 ? '' : total}</span>
    </div>
    <div class="body table">
        {#each items as item, itemIndex}
            {@const priceClass =
                item.isAffectedByMultiplier && multiplier !== 1 ? (multiplier < 1 ? 'green' : 'red') : ''}
            <div class="row">
                <div class="column"><span class={priceClass}>{item.name}</span></div>
                <div class="column"><ItemSelector {item} {categoryIndex} {itemIndex} /></div>
                <div class="column"><span class="left {priceClass}">{item.multipliedPrice}</span></div>
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        border: 2px solid var(--black);
        border-radius: 10px;
        height: 100%;
        background-color: var(--light);
        color: var(--black);
    }
    .header {
        border-start-start-radius: 10px;
        border-start-end-radius: 10px;
        background-color: var(--white);
        color: var(--black);
        padding: 0 10px;
        font-weight: bold;
        font-size: larger;
        display: flex;
        justify-content: space-between;
    }
    .body {
        padding: 5px 10px 5px 5px;
        width: calc(100% - 15px);
        min-width: 300px;
    }
    .table {
        display: table;
    }
    .table > .row {
        display: table-row;
    }
    .table > .row > .column {
        display: table-cell;
        min-width: 3em;
    }
    .left {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
    }
    .red {
        color: var(--darkRed);
    }
    .green {
        color: var(--darkGreen);
    }
</style>
