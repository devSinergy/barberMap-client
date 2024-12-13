<script>
    let userImg = "/images/backgrounds/user.png"
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import Carousel from "$lib/components/carrousel/carousel.svelte";
    // @ts-ignore
    export let data ;
    const {detailStore,services,calendar,reviews,detailreviews,appoitmens,haircuts} = data
    import "/src/global.css";
    let activeTab = 'info';  
    import Calendar from "$lib/components/calendar/calendar.svelte";
    import { selectedDate } from "$lib/components/calendar/calendarStore.js";
    let selected;
    // @ts-ignore
    // @ts-ignore
    $: selected = $selectedDate ? $selectedDate.toDateString() : 'No hay fecha seleccionada';
    $: selectedDateFormatted = $selectedDate
    // @ts-ignore
    ? `${$selectedDate.getFullYear()}-${($selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${$selectedDate.getDate().toString().padStart(2, '0')}`
    : null;

    $: filteredAppointments = appoitmens.filter((/** @type {{ date: string | number | Date; }} */ appointment) => {
    const appointmentDate = new Date(appointment.date);
    const formattedAppointmentDate = `${appointmentDate.getFullYear()}-${(appointmentDate.getMonth() + 1).toString().padStart(2, '0')}-${appointmentDate.getDate().toString().padStart(2, '0')}`;
    return formattedAppointmentDate === selectedDateFormatted; // Comparar solo la fecha
    
    });
    let showModal = false;
    /**
   * @type {null}
   */
    let selectedImage = null;

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
              on:click={() => activeTab = 'dates'}>Calendario de citas</button>
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
            <div>
              <h2 class="text-2xl font-bold text-center mb-6 mt-6  underline underline-offset-8">Reseñas</h2>
              {#if detailreviews.length === 0}
                  <p class="text-center text-gray-600">No hay reseñas para esta barbería.</p>
              {:else}
                  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {#each detailreviews as reviewdetail}
                          <div class="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                              <!-- Imagen de usuario -->
                              <div class="flex-shrink-0">
                                  <img 
                                      src={userImg} 
                                      alt="Imagen de usuario" 
                                      class="w-12 h-12 rounded-full object-cover"
                                  />
                              </div>
                              <!-- Detalles de la reseña -->
                              <div class="flex-1">
                                  <h3 class="text-lg font-semibold text-gray-800 ">{reviewdetail.client}</h3>
                                  <p class="text-sm text-gray-600 mt-1">{reviewdetail.comment}</p>
                              </div>
                              <!-- Puntuación -->
                              <div class="w-[60px] h-[60px] flex items-center justify-center bg-gray-200 text-gray-500 rounded-full text-[30px] font-bold mb-2">
                                  {reviewdetail.puntuation}
                              </div>
                          </div>
                      {/each}
                  </div>
              {/if}
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
            <button
            on:click={() => (showModal = true)}
            class="fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            >
            Ver Peinados
          </button>
          <!-- Modal -->
          {#if showModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-[90%] ">
      <div class="p-4 border-b flex justify-between items-center">
        <h3 class="text-lg font-semibold ">Peinados Disponibles</h3>
        <button on:click={() => (showModal = false)} class="text-gray-600 hover:text-gray-800">
          ✖
        </button>
      </div>

      <!-- Grid de peinados -->
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each haircuts as haircut}
          <div class="border rounded-lg p-2">
            <div>
              <img
                src={haircut.images}
                alt="corte"
                class="w-full h-auto rounded-md cursor-pointer"
                on:click={() => (selectedImage = haircut.images)}
              />
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600 mt-2">
                Estilo: {haircut.style || 'No especificada'}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Imagen a pantalla completa -->
  {#if selectedImage}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div class="relative">
        <button
          on:click={() => (selectedImage = null)}
          class="absolute top-4 right-4 text-white text-3xl"
        >
          ✖
        </button>
        <img src={selectedImage} alt="Imagen a pantalla completa" class="max-w-full max-h-full object-contain" />
      </div>
    </div>
  {/if}
{/if}
          {/each}
        </div>
        {:else if activeTab === 'dates'}
        <div class="p-4">
          <h2 class="text-2xl font-bold mb-4 text-center underline underline-offset-8">Citas</h2>
          <p class="text-gray-600 mb-6 mt-6 p-4 text-center ">
            Aquí puedes ver información y disponibilidad de horas
          </p>
          <Calendar />
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                    {#if filteredAppointments.length > 0}
          {#each filteredAppointments as dates}
            <div class="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
              <p class="font-bold text-xl">Hora: {dates.hour}</p>
              <h3 class="text-lg text-gray-500">{dates.clientname}</h3>
              <p class="text-sm text-gray-500">Servicio: {dates.service}</p>
              <p class="text-sm text-gray-500">Duración: {dates.lapsetime} min</p>
            </div>
          {/each}
        {:else}
          <p class="text-2xl ml-[50%] mt-5 w-full text-center">No hay citas para este día.</p>
        {/if}
          </div>
        </div>
        {/if} 
      </section>
</main>