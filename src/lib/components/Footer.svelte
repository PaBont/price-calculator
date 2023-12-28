<script lang="ts">
    import { get } from 'svelte/store';
    import appDataStore, { setAddition, setDiscount, setOverhead } from '../stores/data-store';
    import MultiplierSelector from './MultiplierSelector.svelte';

    let { overhead, total, addition, additionTotal, discount, discountTotal, finalTotal } = get(appDataStore);
    appDataStore.subscribe((data) => {
        overhead = data.overhead;
        total = data.total;
        addition = data.addition;
        additionTotal = data.additionTotal;
        discount = data.discount;
        discountTotal = data.discountTotal;
        finalTotal = data.finalTotal;
    });

    $: additionPercent = Math.floor(addition * 100);
    $: discountPercent = Math.floor(discount * 100);
    $: roundedAddition = Math.floor(additionTotal);
    $: roundedDiscount = Math.floor(discountTotal);
    $: roundedTotal = Math.floor(total);
    $: roundedFinalTotal = Math.floor(finalTotal);

    const onChangeOverhead = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        const value = parseFloat(e.currentTarget.value);
        setOverhead(value);
    };
    const onChangeAddition = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        const value = parseFloat(e.currentTarget.value);
        setAddition(value / 100);
    };
    const onChangeDiscount = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        const value = parseFloat(e.currentTarget.value);
        setDiscount(value / 100);
    };
</script>

<div class="container">
    <div>
        <MultiplierSelector />
    </div>
    <span class="bold">Teilekosten: {roundedTotal}</span>
    <div>
        <label>
            Fixkosten:
            <input type="number" min="0" max="1000000" value={overhead} on:change={onChangeOverhead} />
        </label>
    </div>
    <div>
        <label>
            Aufschlag (%):
            <input type="number" min="0" max="1000" value={additionPercent} on:change={onChangeAddition} />
        </label>
        <span class="red">+{roundedAddition}</span>
    </div>
    <div>
        <label>
            Rabatt (%):
            <input type="number" min="0" max="100" value={discountPercent} on:change={onChangeDiscount} />
        </label>
        <span class="green">-{roundedDiscount}</span>
    </div>
    <span class="bolder">Endpreis: {roundedFinalTotal}</span>
</div>

<style>
    .container {
        width: calc(100% - 60px);
        padding: 2px 30px 4px;
        background: var(--medium);
        color: var(--white);
        display: flex;
        flex-flow: row wrap;
        gap: 10px;
        font-size: 1.2em;
        justify-content: space-between;
    }
    input {
        font-size: 1.1em;
    }
    .red {
        color: var(--lightRed);
    }
    .green {
        color: var(--lightGreen);
    }
    .bold {
        font-weight: bold;
    }
    .bolder {
        font-weight: bolder;
    }
</style>
