<script>
// @ts-nocheck

    // @ts-ignore
    import jwt_decode from 'jwt-decode';
    import { goto } from '$app/navigation';
    let userImg = "/images/backgrounds/user.png"
    import NavBar from "$lib/components/navBar/navBar.svelte";
    import Footer from "$lib/components/footer/footer.svelte";
    import Carousel from "$lib/components/carrousel/carousel.svelte";
    // @ts-ignore
    // @ts-ignore
    export let data = {};
    const {
        detailStore = {}, // Valores por defecto
        services = [],
        calendar = [],
        reviews = {}, // reviews puede ser un objeto vacío
        detailreviews = [],
        appoitmens = [],
        haircuts = [],
        clients = [],
        barbers = [], 
    } = data;
    import "/src/global.css";
    let activeTab = 'info';  
    import Calendar from "$lib/components/calendar/calendar.svelte";
    import { selectedDate } from "$lib/components/calendar/calendarStore.js";
    
    
    // @ts-ignore
    let selected;
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    $: selected = $selectedDate ?? 'No hay fecha seleccionada';
    
    
    $: filteredAppointments = Array.isArray(appoitmens)
  ? appoitmens.filter(appointment => {
      return appointment.date === $selectedDate;
    })
  : [];
    let showModal = false;
    /**
   * @type {null}
   */
    let selectedImage = null;
  
    //**Codigo para crear cita

   
    let date = "";
    let hour = "";
    let serviceid = '';
    let barberid ='';
    const lapsetime = 3; // lapsetime por defecto siempre será 30
    let barbershopid = ""; // Será recogido desde la ruta
    let clientname = "";

    let showDateModal = false;

// Abrir modal
    function openModal() {
      try {
        const token = localStorage.getItem('authUser');
       if (!token) {
      // Si no hay token, redirigir al login
      goto('/login');
      return;
    }
      } catch (error) {
      }
      showDateModal = true;
    }

    // Cerrar modal
    function closeModal() {
      showDateModal = false;
    }

    function crateDate() {
    try {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('authUser');
    if (!token) {
      // Si no hay token, redirigir al login
      goto('/login');
      return;
    }

    // Decodificar el token para obtener el nombre del usuario (clientname)
    const decoded = jwt_decode(token);
    const username = decoded.name;

    // Verificar que el formulario esté completo
    if (!date || !hour) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Obtener barbershopid de la ruta
    const barbershopid = window.location.pathname.split('/')[2]; // Ajusta según cómo esté estructurada tu URL
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    // Construir el objeto de la cita
    const appointmentData = {
      barberid,
      serviceid,
      clientname: username, // Nombre del cliente obtenido desde el token
      date:formattedDate,
      hour,
       
    };
    
    // Enviar los datos al servidor
    fetch(`https://barbermap-server.onrender.com/appoitmens/${barbershopid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
      
    })
    
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Cita creada exitosamente.");
          // Redirigir a la página de la barbería
          goto(`/barbershop/${barbershopid}`);
        } else {
          alert("Tu cita se ha creado correctamente");
        }
      })
      .catch(error => {
        console.error('Error al crear la cita:', error);
        alert("Hubo un problema con la creación de la cita.");
      });
      closeModal();
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    // En caso de error al decodificar el token, redirigir al login
    goto('/login');
  }
}


</script>
<main  class="flex flex-col min-h-screen">
    <NavBar/>
    <div class="flex-1 container mx-auto mb-4">
      <nav class="bg-black p-2 w-full  ">
      <ul class="flex justify-center flex-wrap space-x-6 gap-4  font-bold text-center lg:space-x-[300px] ">
          <li>
            <button 
              class={activeTab === 'info' ? 'text-white' : 'text-white' } 
              on:click={() => activeTab = 'info'}>Info</button>
          </li>
          <li>
            <button 
              class={activeTab === 'services' ? 'text-white' : 'text-white' } 
              on:click={() => activeTab = 'services'} >Servicios</button>
          </li>
          <li>
            <button 
              class={activeTab === 'workers' ? 'text-white' : 'text-white'} 
              on:click={() => activeTab = 'dates'}>Calendario de citas</button>
          </li>
        </ul>
    </nav>
    <section>
        {#if activeTab === 'info'}
        <div class="flex flex-col lg:flex-row">
            <div>
              <div class="relative w-full h-full">
                <!-- Carousel de imágenes con brillo bajo -->
                <div class="h-full brightness-75">
                  <Carousel images={detailStore.images} title={detailStore.name} />
                </div>
              
                <!-- Contenido superpuesto encima del carrusel -->
                <div class="absolute inset-0 flex flex-col mt-12 items-center text-white text-center px-4 ">
                  <h1 class="text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">{detailStore.name}</h1>
                  <p class="text-xl italic mb-2 drop-shadow-md">"{detailStore.slogan}"</p>
                  <div class="absolute bottom-10 w-full text-center">
                    <p class="text-md mb-1">{detailStore.addres}, {detailStore.postalcode}</p>
                    <div class="flex items-center mt-1 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                      <span>{detailStore.phonenumber}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-white rounded-lg shadow-md">
                <h1 class="text-2xl font-bold mb-4 text-gray-800 text-center">Barberos</h1>
              
                <div class="grid  grid-cols-2 lg:grid-cols-3">
                  {#each barbers as barber}
                    <div class="flex flex-col gap-2 items-center  p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                      <img
                        src={barber.image}
                        alt={barber.name}
                        class="w-[90px] h-[90px] rounded-full object-cover border-2 border-gray-300"
                      />
                      <p class="text-gray-700 font-bold">{barber.name}</p>
                    </div>
                  {/each}
                </div>
              </div>
              <div class="overflow-x-auto p-4 ">
                  <div class="p-2 rounded-md mb-3">
                      <p class="text-xl text-red-600 text-center font-bold text-animated">{calendar[0].especialday}</p>
                  </div>
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
                        {#if calendar && calendar.length > 0 && calendar[0].sunday === true}
                        <tr class="border-b hover:bg-gray-100">
                            <td class="px-4 py-2 text-sm">Domingo</td>
                            <td class="px-4 py-2 text-sm" colspan="2">Cerrado</td>
                        </tr>
                        {/if}
                    </tbody>
                </table>
              </div>
            </div>
            
            <div class="mt-4">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 text-center">
                    <h3 class="animate-charcter font-bold font-mono"> Nuestros Clientes</h3>
                  </div>
                </div>
              </div>
              {#if clients.length === 0}
                <p>No hay clientes para esta barberia</p>
              {:else}
                <p class="text-center font-mono text-2xl text-blue-600">{clients.length}</p>
              {/if}
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
            <div class="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-64 ">
              <!-- Título -->
              <div class="bg-black text-white text-center py-2 font-bold">
               <p> {service.title}</p> 
              </div>
              <!-- Contenido de la tarjeta -->
              <div class="p-4">
                <p class="text-gray-700 text-sm mb-2">
                  "{service.description}"
                </p>
                
              </div>
              <div class="p-2 mt-[-10px] flex flex-row justify-around items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-600 vibrar">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-yellow-600 vibrar">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
                <p class="text-lg font-semibold text-gray-900 text-center">
                  {service.price}€
                </p>
              </div>
            </div>
            <button
            on:click={() => (showModal = true)}
            class="fixed bottom-[190px] right-6 bg-gray-900 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            >
            Ver Peinados
          </button>
          <!-- Modal -->
          {#if showModal}
          <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg max-w-lg w-[90%] ">
              <div class="p-4 border-b flex justify-around items-center ">
                <h3 class="text-lg font-semibold text-center ml-9 underline underline-offset-4">Peinados Disponibles</h3>
                <button on:click={() => (showModal = false)} class="text-gray-600 hover:text-gray-800 justify-sel">
                  ✖
                </button>
              </div>

              <!-- Grid de peinados -->
              <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  p-2 bg-white">
                {#each haircuts as haircut}
                  <div class="border-gray-900 rounded-lg p-2 text-center flex flex-col gap-4 mt-2  border-2">
                      <p class="text-blue-700 underline-offset-4 underline ">Estilo </p>
                      <p class="text-2xl text-gray-900 font-bold mt-[-20px]">
                         {haircut.style || 'No especificada'}
                      </p>
                      <img
                        src={haircut.images}
                        alt="corte"
                        class="w-full h-auto rounded-md cursor-pointe border-6 p-1"
                        on:click={() => (selectedImage = haircut.images)}
                      />
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
        <div class="p-4 flex flex-col items-center">
          <h2 class="text-2xl font-bold text-center underline underline-offset-8">Citas</h2>
          <p class="text-gray-600 mb-2 mt-2 p-4 text-center ">
            Aquí puedes ver información y disponibilidad de horas
          </p>
          <div>
            <button on:click={openModal} class="text-2xl bg-blue-400 border-blue-700 border-2 rounded-lg p-2 text-white mb-4">Reservar cita</button>
          </div> 
          {#if showDateModal}
            <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" on:click={closeModal}>
              <div class="bg-white p-6 rounded-lg w-96" on:click|stopPropagation>
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Crear Cita</h2>
                <form on:submit|preventDefault={crateDate}>
                  <div class="mb-4">
                    <label for="barberid" class="block text-sm font-medium text-gray-600">Barbero</label>
                    <select
                      id="barberid"
                      bind:value={barberid}
                      required
                      class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled selected>Selecciona un Barbero</option>
                      {#each barbers as barber}
                        <option value={barber._id}>{barber.name}</option>
                      {/each}
                    </select>
                  </div>
                  <div class="mb-4">
                    <label for="serviceid" class="block text-sm font-medium text-gray-600">Servicio</label>
                    <select
                      id="serviceid"
                      bind:value={serviceid}
                      required
                      class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled selected>Selecciona un servicio</option>
                      {#each services as service}
                        <option value={service._id}>{service.title}</option>
                      {/each}
                    </select>
                  </div>
                  <!-- Campo de Fecha -->
                  <div class="mb-4">
                    <label for="date" class="block text-sm font-medium text-gray-600">Fecha</label>
                    <input id="date" type="date" bind:value={date} class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>

                  <!-- Campo de Hora -->
                  <div class="mb-4">
                    <label for="hour" class="block text-sm font-medium text-gray-600">Hora</label>
                    <input id="hour" type="time" bind:value={hour} step="1800" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>

                 

                  <!-- Botones -->
                  <div class="flex justify-around mt-4">
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                      Crear cita
                    </button>
                    <button type="button" on:click={closeModal} class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          {/if}
          <Calendar />
          <div class="grid  grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  w-[90%] ">
            {#if filteredAppointments.length > 0}
            {#each filteredAppointments.sort((a, b) => (a.hour ?? '').localeCompare(b.hour ?? '')) as dates}
            <div class="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 items-center">
              <p class="font-bold text-xl text-blue-600">Hora: {dates.hour}</p>
              <p class="text-sm text-gray-500">Fin: {dates.hourfinish}</p>
              <p class="text-sm text-black font-bold flex items-center gap-2">Barber: {dates.barberid.name}</p>
              <span class="w-3 h-3 bg-red-600 rounded-full inline-block"></span>
                <span class="text-red-600 font-semibold text-sm">Ocupado</span>
            </div>
            {/each}
          {:else}
            <p class="text-2xl ml-[50%] mt-5 w-full text-center">No hay citas para este día.</p>
          {/if}
          </div>
        </div>
        {/if} 
    </section>
    </div>
    <Footer/>
</main>
<style>
  /* Animación de vibración */
  @keyframes vibracion {
    0% { transform: translateY(0); }
      25% { transform: translateY(-5px); }
      50% { transform: translateY(0); }
      75% { transform: translateY(-3px); }
      100% { transform: translateY(0); }
  }

  /* Aplica la animación */
  .vibrar {
    animation: vibracion 3s ease-in-out infinite;
  }

  @keyframes text-move {
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-1%);
  }
}

.text-animated {
  display: inline-block; /* Para asegurarse de que el movimiento se aplique correctamente */
  white-space: nowrap;   /* Evita que el texto salte a otra línea */
  overflow: hidden;
  animation: text-move 10s linear infinite; /* Duración de 5s, repetición infinita */
}

.poired {
  font-family: 'Poiret One', sans-serif;
}

.animate-charcter
{
   text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    rgb(42, 0, 192) 0%,
    #140ddb 29%,
    #fe0d0d 67%,
    #f40d0d 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 4s linear infinite;
  display: inline-block;
      font-size: 25px;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
</style>