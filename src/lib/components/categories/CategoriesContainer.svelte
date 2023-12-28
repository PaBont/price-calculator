<script lang="ts">
    import { get } from 'svelte/store';
    import dataStore from '../../stores/data-store';
    import CategoryContainer from './CategoryContainer.svelte';

    let data = get(dataStore);
    dataStore.subscribe(($data) => (data = $data));

    $: categories = data.itemCategories;
</script>

<div class="container">
    {#each categories as _, categoryIndex}
        <div>
            <CategoryContainer {categoryIndex} />
        </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-flow: row wrap;
        max-height: 100%;
        max-width: calc(100% - 20px);
        gap: 10px 15px;
        padding: 0 0 10px 10px;
        align-items: stretch;
    }

    .container > * {
        flex: 1 1 1;
    }
</style>
