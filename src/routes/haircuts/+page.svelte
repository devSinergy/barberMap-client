<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import Footer from "$lib/components/footer/footer.svelte";
    export let data;
    import "/src/global.css";
    const {haircuts} = data
    import { getStoreOne } from "$lib/comunications/endpoints/barberShopRoutes.js";
  
    /**
   * @type {any[]}
   */
    let barberInfo = [];

    const fetchBarber = async () =>{
        barberInfo = await Promise.all(
            haircuts.map(async(/** @type {{ barbershopid: any; }} */ haircut)=>{
                try {
                    
                    const store = await getStoreOne(haircut.barbershopid)
                    return {
                        ...haircut,
                        barbershopName: store.name,
                    
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
<main class="flex flex-col min-h-screen">
    <NavBar/>
    <section class="mt-6 flex-1 container mx-auto p-4">
        <h2 class="text-2xl text-center mt-4 mb-8 font-serif font-semibold underline underline-offset-8">Peinados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each barberInfo as haircut}
            <div class="border rounded-lg p-4">
                <div class="gradient-border">
                  <img src={haircut.images} alt="corte" class="w-full h-auto rounded-md p-2">
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