<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import Carousel from "$lib/components/carrousel/carousel.svelte";
    export let data ;
    const {detailStore,services} = data
    import "/src/global.css";
    let activeTab = 'info';  
    console.log(services)
    console.log(detailStore)

</script>
<main>
    <NavBar/>
    <nav class="bg-gray-400 p-4  ">
      <ul class="flex justify-center flex-wrap space-x-6 gap-4  font-bold text-center lg:space-x-[300px] ">
          <li>
            <button 
              class={activeTab === 'info' ? 'text-white' : 'text-black' } 
              on:click={() => activeTab = 'info'}>Info</button>
          </li>
          <li>
            <button 
              class={activeTab === 'services' ? 'text-white' : 'text-black' } 
              on:click={() => activeTab = 'services'} >Servicios</button>
          </li>
          <li>
            <button 
              class={activeTab === 'workers' ? 'text-white' : 'text-black'} 
              on:click={() => activeTab = 'workers'}>Trabajadores</button>
          </li>
        </ul>
    </nav>
    <section>
        {#if activeTab === 'info'}
        <div class="flex flex-col lg:flex-row">
            <div class="w-full lg:w-1/2 p-4">
              <h2 class="text-xl font-semibold">{detailStore.name}</h2>
              <p class="mt-2">{detailStore.postalcode}</p>
            </div> 
          
            <div class="w-full lg:w-1/2 p-4">
              <Carousel images={detailStore.images} />
            </div>
        </div>
        {:else if activeTab === 'services'}
        <div class="flex flex-wrap justify-center lg:justify-start gap-6 mt-6 px-4">
          {#each services as service}
            <div class="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-64">
              <!-- Título -->
              <div class="bg-black text-white text-center py-2 font-bold">
                {service.title}
              </div>
              <!-- Contenido de la tarjeta -->
              <div class="p-4">
                <p class="text-gray-700 text-sm mb-2">
                  "{service.description}"
                </p>
                <p class="text-lg font-semibold text-gray-900 text-center">
                  {service.price}€
                </p>
              </div>
            </div>
          {/each}
        </div>
        <div>

        </div>
        {/if} 
      </section>
</main>