<script>
    // @ts-nocheck
        import NavBar from "$lib/components/navBar/navBar.svelte";
        import Footer from "$lib/components/footer/footer.svelte";
        export let data;
        import "/src/global.css";
        const { haircuts } = data;
        import { getStoreOne } from "$lib/comunications/endpoints/barberShopRoutes.js";
      
        /**
         * @type {any[]}
         */
        let barberInfo = [];
        let filters = { style: '', hairtype: '' };
    
        // Obtener barberías
        const fetchBarber = async () => {
            barberInfo = await Promise.all(
                haircuts.map(async (haircut) => {
                    try {
                        const store = await getStoreOne(haircut.barbershopid);
                        return {
                            ...haircut,
                            barbershopName: store.name,
                        };
                    } catch (error) {
                        console.error('Error al obtener detalles del barbero:', error);
                        return {
                            ...haircut,
                            barbershopName: 'Desconocido',
                        };
                    }
                })
            );
        };
        fetchBarber();
    
        // Filtrar barberInfo en base a filtros
        $: filteredBarberInfo = barberInfo.filter((haircut) => {
            return (
                (filters.style === '' || haircut.style?.toLowerCase().includes(filters.style.toLowerCase())) &&
                (filters.hairtype === '' || haircut.hairtype?.toLowerCase().includes(filters.hairtype.toLowerCase()))
            );
        });
    
        // Resetear filtros
        function resetFilters() {
            filters = { style: '', hairtype: '' };
        }
    </script>
    
    <main class="flex flex-col min-h-screen">
        <NavBar/>
        <section class=" flex-1 container mx-auto p-4">
            <h2 class="text-2xl text-center mt-2  font-serif font-semibold underline underline-offset-8">Peinados</h2>
            <form class="mb-6 mt-4 grid grid-cols-2 gap-6 items-start bg-white p-4 rounded-lg shadow-md lg:gap-[200px] lg:flex-row">
                <input 
                    type="text" 
                    bind:value={filters.style} 
                    placeholder="Estilo"
                    class="p-2 border rounded w-36"
                />
                <input 
                    type="text" 
                    bind:value={filters.hairtype} 
                    placeholder="Tipo de cabello"
                    class="p-2 border rounded w-36"
                />
                <button 
                    type="button" 
                    on:click={resetFilters} 
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-[90%]"
                >
                    Limpiar
                </button>
            </form>
            <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each filteredBarberInfo as haircut}
                <div class="border rounded-lg p-4">
                    <div class="gradient-border">
                        <img src={haircut.images} alt="corte" class="w-full h-auto rounded-md ">
                    </div>
                    <div class="text-center">
                        <h3 class="mt-2 text-[12px] font-semibold">Created by:</h3>
                        <p class="text-2xl">{haircut.owner}</p>
                        <p class="text-sm text-gray-600 mt-2">
                            {haircut.style || 'No especificada'}
                        </p>
                        <p class="text-sm text-gray-600 mt-2">
                            {haircut.hairtype || 'No especificada'}
                        </p>
                        <a 
                            href={`/barbershops/${haircut.barbershopid}`} 
                            class="mt-2 text-blue-600 hover:underline cursor-pointer"
                            aria-label={`Ver detalles de la barbería ${haircut.barbershopid}`}
                        >
                            {haircut.barbershopName}
                        </a>
                    </div>
                </div>
                {/each}
            </div>
        </section>
        <Footer/>
    </main>
    