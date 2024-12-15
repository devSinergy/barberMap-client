<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import { showAppoitmens } from "$lib/comunications/endpoints/appoitmensRoutes";
    import { getStoreHaircut } from "$lib/comunications/endpoints/haircutRoutes";
    import { showReviews } from "$lib/comunications/endpoints/reviewsRoutes";
    
    
    export let data; // Recibe la data pasada desde `+page.server.js`
    let barbershopid = data// Extraemos barbershopid
    let activeTab = 'appointments';

    // @ts-ignore
    let appointments = [];
    // @ts-ignore
    let haircuts = [];
    // @ts-ignore
    let reviews = [];
    let loading = true;

    // Función para obtener datos
    const fetchData = async () => {
   
    try {
        loading = true;
        appointments = await showAppoitmens(barbershopid);
        haircuts = await getStoreHaircut(barbershopid);
        reviews = await showReviews(barbershopid);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading = false;
        
    }
};

    onMount(() => {
        fetchData();
    });
</script>

<main class="flex min-h-screen bg-gray-100">
    <div></div>
    <!-- Barra lateral -->
    <aside class="w-1/4 bg-gray-900 text-white p-4">
        <nav>
            <ul class="flex flex-col gap-6 ">
                <li>
                    <button 
                        class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer underline underline-offset-8"
                        class:selected={activeTab === 'appointments'}
                        on:click={() => activeTab = 'appointments'}
                        aria-pressed={activeTab === 'appointments'}>
                        Citas
                    </button>
                </li>
                <li>
                    <button 
                        class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer underline underline-offset-8"
                        class:selected={activeTab === 'haircuts'}
                        on:click={() => activeTab = 'haircuts'}
                        aria-pressed={activeTab === 'haircuts'}>
                        Peinados
                    </button>
                </li>
                <li>
                    <button 
                        class="w-full p-2 text-left hover:bg-gray-700 cursor-pointer underline underline-offset-8"
                        class:selected={activeTab === 'reviews'}
                        on:click={() => activeTab = 'reviews'}
                        aria-pressed={activeTab === 'reviews'}>
                        Reseñas
                    </button>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Contenido -->
    <section class="flex-1 p-4">
        {#if loading}
            <p>Cargando datos...</p>
        {:else}
            {#if activeTab === 'appointments'}
            <h2 class="text-xl font-bold mb-4">Citas</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {#each appointments as { clientname, date, hour, lapsetime }}
                    <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 class="text-lg font-semibold mb-2">{clientname}</h3>
                        <p><strong>Fecha:</strong> {new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Hora:</strong> {hour}</p>
                        <p><strong>Duración:</strong> {lapsetime}</p>
                    </div>
                {/each}
            </div>
            {/if}

            {#if activeTab === 'haircuts'}
                <h2 class="text-xl font-bold mb-4">Peinados</h2>
                <ul class="grid grid-cols-2 gap-4">
                    {#each haircuts as { images, style }}
                        <li class="p-4 border shadow rounded">
                            <img src={images} alt={style} class="w-full h-32 object-cover rounded" />
                            <p class="mt-2">{style}</p>
                        </li>
                    {/each}
                </ul>
            {/if}

            {#if activeTab === 'reviews'}
                <h2 class="text-xl font-bold mb-4">Reseñas</h2>
                <ul>
                    {#each reviews as { puntuation, comment, client }}
                    <li class="p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div class="flex flex-col">
                            <p class="text-lg font-semibold"><strong>Cliente:</strong> {client}</p>
                            <p class="text-sm text-gray-600 mt-2"><strong>Comentario:</strong> {comment}</p>
                            <p class="text-sm text-yellow-500 mt-2"><strong>Puntuación:</strong> {puntuation}</p>
                        </div>
                    </li>
                    {/each}
                </ul>
            {/if}
        {/if}
    </section>
</main>
