<script>
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import { goto } from '$app/navigation';
    export let data // Recibe los datos de barberos desde el load()
    const { barberShops, codigoPostal} = data;
    
    let filters = {
    codigoPostal,
    nombre: '',
    estado: ''
     };
     $: filteredBarberShops = barberShops.filter((/** @type {{ postalcode: string | string[]; name: string; status: string; }} */ barbershop) => {
    return (
      (filters.codigoPostal === '' || barbershop.postalcode?.includes(filters.codigoPostal)) &&
      (filters.nombre === '' || barbershop.name?.toLowerCase().includes(filters.nombre.toLowerCase())) &&
      (filters.estado === '' || barbershop.status?.toLowerCase() === filters.estado.toLowerCase())
    );
  });

  function resetFilters() {
    filters = {
      codigoPostal: '',
      nombre: '',
      estado: ''
    };
  }
</script>
<main>
    <NavBar />
    
    <section class="p-6 bg-gray-100">
        <form class="mb-6 flex flex-col gap-6 items-start bg-white p-4 rounded-lg shadow-md lg:gap-[200px] lg:flex-row">
            
           <input 
              type="text" 
              bind:value={filters.nombre} 
              placeholder="Nombre de la barbería"
              class="p-2 border rounded w-48"
            />
          <input 
              type="text" 
              bind:value={filters.codigoPostal} 
              placeholder="Código Postal"
              class="p-2 border rounded w-48"
            />
            <select 
              bind:value={filters.estado}
              class="p-2 border rounded w-48"
            >
              <option value="">Estado</option>
              <option value="disponible">Disponible</option>
              <option value="no disponible">No Disponible</option>
            </select>
            <button type="button" on:click={resetFilters} class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Limpiar
            </button>
        </form>

          <h1 class="text-2xl font-bold text-center mb-6">Lista de Barberías</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {#if filteredBarberShops.length > 0}
              {#each filteredBarberShops as barbershop}
                <div class="steam1  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 relative rounded-lg shadow-lg overflow-hidden bg-white group">
                  <!-- Imagen -->
                  <img 
                    src={barbershop.cover} 
                    alt="barbershop" 
                    class="w-full h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-50 p-2"
                  />
                  <!-- Contenido -->
                  <div class="absolute text-center inset-0 p-4 bg-black bg-opacity-90 flex flex-col justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div class="absolute top-4 right-4 flex items-center space-x-1 text-white">
                      <!-- Usamos el icono de un ojo -->
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      
                      <p class="text-sm">{barbershop.views}</p>
                    </div>
                    <div>
                      <h2 class="text-xl pb-4 text-white font-semibold">{barbershop.name}</h2>
                        <p class="text-sm text-white mb-4 underline underline-offset-8 "> {barbershop.addres}</p>
                        <p class="text-sm text-white"> {barbershop.phonenumber}</p>
                      <button class="bg-white rounded-lg p-2 mt-6 font-bold" on:click={() => goto(`/barbershops/${barbershop._id}`)}>Visitar</button>
                    </div>
                    
                  </div>
                </div>
              {/each}
            {/if}
          </div>
          
    </section>
    
</main>