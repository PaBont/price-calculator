<script lang="ts">
    import Footer from './lib/components/Footer.svelte';
    import Header from './lib/components/Header.svelte';
    import CategoriesContainer from './lib/components/categories/CategoriesContainer.svelte';
    import type Data from './lib/data/data';
    import { readData } from './lib/data/data';
    import { setData } from './lib/stores/data-store';

    const loadData: () => Promise<Data> = async () => {
        const response = await fetch('/price-calculator/data.json');
        const data = await response.json();

        return readData(data);
    };

    let dataLoader = loadData();
    dataLoader.then((data) => setData(data));
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo-32.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LSC Nord Tuning Rechner</title>
</svelte:head>

<div class="container">
    <div class="header pseudo-header">
        <Header />
    </div>
    <div class="pseudo-header" />
    <div>
        {#await dataLoader}
            Loading data...
        {:then}
            <CategoriesContainer />
        {:catch e}
            Failed to load data: {e}
        {/await}
    </div>
    <div class="pseudo-footer" />
    <div class="footer">
        <Footer />
    </div>
</div>

<style>
    .header {
        position: fixed;
        top: 0;
        left: 0;
    }
    .pseudo-header {
        width: 100%;
        height: 50px;
        margin-bottom: 10px;
    }
    .container {
        width: 100%;
        height: 99vh;
        min-width: 25em;
    }
    .pseudo-footer {
        height: 15em;
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>
