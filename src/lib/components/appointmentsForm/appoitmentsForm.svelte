<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { createAppoitmens } from "$lib/comunications/endpoints/appoitmensRoutes";
    import { getBarber } from '$lib/comunications/endpoints/barbersRoutes';
    import { getServices } from '$lib/comunications/endpoints/servicesRoutes';
    export let barbershopid;
    export let show = false;
    export let closeModal;
  
    let formData = { clientname: '', date: '', hour: '', barberid: '', serviceid: '' };
    
    let services = [];
    let barbers = [];
    let errorCita = '';
  
    // Fecha mínima para el input date
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
  
    onMount(async () => {
      try {
        // Aquí llamas las funciones fetch para traer servicios y barberos
        const servicesResponse = await getServices(barbershopid) ;
        services = await servicesResponse
  
        const barbersResponse = await getBarber(barbershopid);
        barbers = await barbersResponse
      } catch (error) {
        console.error("Error cargando servicios o barberos:", error);
      }
    });

    function formatDateToSpanish(dateStr) {
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getFullYear()); // solo los últimos 2 dígitos
  return `${day}/${month}/${year}`;
}
  
    async function addAppointment() {
      if (!formData.clientname || !formData.date || !formData.hour  || !formData.barberid || !formData.serviceid) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      formData.date = formatDateToSpanish(formData.date);
      
      try {
        await createAppoitmens(formData, barbershopid);
        formData = { clientname: '', date: '', hour: '', barberid: '', serviceid: '' };
        
        closeModal();
      } catch (error) {
        errorCita = error.response.data.message
        alert(errorCita);
      }
    }
  </script>
  
  {#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <form 
      on:submit|preventDefault={addAppointment}
      class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-700">Crear Nueva Cita</h2>

      <label class="block mb-4">
        <span class="text-gray-700 font-medium">Nombre del Cliente:</span>
        <input 
          type="text" 
          bind:value={formData.clientname} 
          placeholder="Nombre del cliente"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>

      <label class="block mb-4">
        <span class="text-gray-700 font-medium">Barbero:</span>
        <select 
          bind:value={formData.barberid} 
          required
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="" disabled selected>Selecciona un barbero</option>
          {#each barbers as barber}
            <option value={barber._id}>{barber.name} {barber.lastname}</option>
          {/each}
        </select>
      </label>

      <label class="block mb-4">
        <span class="text-gray-700 font-medium">Servicio:</span>
        <select 
          bind:value={formData.serviceid} 
          required
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="" disabled selected>Selecciona un servicio</option>
          {#each services as service}
            <option value={service._id}>{service.title}</option>
          {/each}
        </select>
      </label>

      <label class="block mb-4">
        <span class="text-gray-700 font-medium">Fecha:</span>
        <input 
          type="date" 
          bind:value={formData.date} 
          min={minDate} 
          required
          class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>

      <label class="block mb-4">
        <span class="text-gray-700 font-medium">Hora:</span>
        <input 
          type="time" 
          bind:value={formData.hour}  
          class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>

      

      <div class="flex justify-between">
        <button 
          type="submit" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Crear cita
        </button>

        <button 
          type="button" 
          on:click={closeModal} 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
{/if}

  
