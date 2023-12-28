<script lang="ts">
    import { get } from 'svelte/store';
    import appDataStore, { setSelectedMultiplierIndex } from '../stores/data-store';

    let { multipliers, selectedMultiplierIndex } = get(appDataStore);
    appDataStore.subscribe((data) => {
        multipliers = data.multipliers;
        selectedMultiplierIndex = data.selectedMultiplierIndex;
    });

    $: multiplierNames = multipliers.map(({ name }) => name);

    const onSelectedItemChanged = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
        const index = parseInt(e.currentTarget.value);
        setSelectedMultiplierIndex(index);
    };
</script>

<label>
    Faktor:
    <select on:change={onSelectedItemChanged}>
        {#each multiplierNames as multiplier, index}
            <option value={index}>{multiplier}</option>
        {/each}
    </select>
</label>

<style>
    select {
        font-size: 1em;
    }
</style>
