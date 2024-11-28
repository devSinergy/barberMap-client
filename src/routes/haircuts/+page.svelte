<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    export let data;
    const {haircuts} = data
</script>
<main>
    <NavBar/>
    <section class="mt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each haircuts as haircut}
            <div class="border rounded-lg p-4">
                <img src={haircut.images} alt="corte" class="w-full h-auto rounded-md">
            </div>
            {/each}
        </div>
    </section>
</main>