<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    export let data;
    const {haircuts} = data
</script>
<main>
    <NavBar/>
    <section>
        <div>
            {#each  haircuts as haircut }
            <ul>
                <img src={haircut.images} alt=corte>
            </ul>
            {/each}
        </div>
    </section>
</main>