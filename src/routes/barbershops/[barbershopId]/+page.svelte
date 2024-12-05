<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import Carousel from "$lib/components/carrousel/carousel.svelte";
    export let data ;
    const {detailStore,services,calendar,reviews} = data
    import "/src/global.css";
    let activeTab = 'info';  
    console.log(calendar)
    console.log(services)
    
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
        <div class="text-2xl text-center mt-4 mb-4 font-serif font-semibold underline underline-offset-8">
          <h2>Información</h2>
        </div>
        <div class="flex flex-col lg:flex-row">
            <div>
              <div class="w-full lg:w-1/2 p-4 text-center">
                <h2 class="text-xl font-semibold">{detailStore.name}</h2>
                <p class="mt-2">{detailStore.addres},  {detailStore.postalcode}</p>
                <p class="mt-2">{detailStore.phonenumber}</p>
                {#if reviews.promedio}
                <p class="text-sm text-white mt-4 flex justify-center items-center">
                   <span class="ml-2 flex ">
                    {#each Array(5) as _, index}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        class="w-5 h-5 {index < Math.round(reviews.promedio) ? 'text-yellow-500' : 'text-gray-300'}"
                      >
                        <path d="M12 .587l3.668 7.429 8.2 1.179-5.917 5.761 1.396 8.144L12 18.897l-7.347 3.873 1.396-8.144-5.917-5.761 8.2-1.179z" />
                      </svg>
                    {/each}
                  </span>
                </p>
              {:else}
                <p class="text-sm text-white mt-4">No hay reseñas disponibles.</p>
              {/if}
              </div> 
              <div class="overflow-x-auto p-4">
                <table class="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="px-4 py-2 text-left">Día</th>
                            <th class="px-4 py-2 text-left">Mañana</th>
                            <th class="px-4 py-2 text-left">Tarde</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as dia}
                            <tr class="border-b hover:bg-gray-100">
                                <td class="px-4 py-2 text-sm">{dia}</td>
                                {#each calendar as horario}
                                    <td class="px-4 py-2 text-sm">
                                        {horario.general[0].open} - {horario.general[0].close} <!-- Mañana -->
                                    </td>
                                    <td class="px-4 py-2 text-sm">
                                        {horario.general[1].open} - {horario.general[1].close} <!-- Tarde -->
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                        {#if calendar[0].sunday === true}
                            <tr class="border-b hover:bg-gray-100">
                                <td class="px-4 py-2 text-sm">Domingo</td>
                                <td class="px-4 py-2 text-sm" colspan="2">Cerrado</td>
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
            </div>
            <div class="w-full lg:w-1/2 p-4">
              <Carousel images={detailStore.images} />
            </div>
        </div>
        {:else if activeTab === 'services'}
        <div class="text-2xl text-center mt-4 mb-4 font-serif font-semibold underline underline-offset-8">
          <h2>Servicios</h2>
        </div>
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
        
        {/if} 
      </section>
</main>