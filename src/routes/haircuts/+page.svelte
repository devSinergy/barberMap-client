<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    export let data;
    import "/src/global.css";
    import { goto } from '$app/navigation';
    const {haircuts} = data
    import { getBarber } from "$lib/comunications/endpoints/barbersRoutes.js";
    import { getStoreOne } from "$lib/comunications/endpoints/barberShopRoutes.js";
    /**
   * @type {any[]}
   */
    let barberInfo = [];

    const fetchBarber = async () =>{
        barberInfo = await Promise.all(
            haircuts.map(async(/** @type {{ barberId: any; }} */ haircut)=>{
                try {
                    const barber = await getBarber(haircut.barberId);
                    const store = await getStoreOne(barber.workplaceid)
                    return {
                        ...haircut,
                        barberName: barber.name,
                        barberExperience: barber.experience, // Si tienes otros campos relevantes
                        barberWorkPlacer : barber.workplaceid,
                        storeName : store.name
                    };
                } catch (error) {
                    console.error('Error al obtener detalles del barbero:', error);
                    return {
                        ...haircut,
                        barberName: 'Desconocido',
                    };
                }
            })
        )
    };
    fetchBarber();
</script>
<main>
    <NavBar/>
    <section class="mt-6">
        <h2 class="text-2xl text-center mt-4 mb-8 font-serif font-semibold underline underline-offset-8">Peinados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each barberInfo as haircut}
            <div class="border rounded-lg p-4">
                <div class="gradient-border">
                  <img src={haircut.images} alt="corte" class="w-full h-auto rounded-md p-2">
                </div>
                <div class="text-center">
                  <h3 class="mt-2 text-[12px] font-semibold">Created by:</h3>
                  <p class="text-2xl">{haircut.barberName}</p>
                  <p class="text-sm text-gray-600 mt-2">
                    Estilo: {haircut.style || 'No especificada'}
                  </p>
                  <a 
                    href={`/barbershops/${haircut.barberWorkPlacer}`} 
                    class="mt-2 text-blue-600 hover:underline cursor-pointer"
                    aria-label={`Ver detalles de la barbería ${haircut.storeName}`}
                  >
                    {haircut.storeName}
                  </a>
                </div>
              </div>
            {/each}
        </div>
    </section>
</main>