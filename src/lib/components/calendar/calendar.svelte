<script>
// @ts-nocheck

  import { selectedDate } from './calendarStore';
  import { writable } from 'svelte/store';

  // Para simplificar, generaremos un calendario de prueba
  let today = new Date();
  let currentMonth = writable(today.getMonth());
  let currentYear = writable(today.getFullYear());

  // Función para seleccionar una fecha
  /**
   * @param {number | undefined} day
   */
  function selectDate(day) {
    const date = new Date($currentYear, $currentMonth, day);
    selectedDate.set(date); // Actualiza la store
  }

  $: selected = $selectedDate ? $selectedDate.toDateString() : 'No hay fecha seleccionada';
  // Generar los días del mes actual
  /**
   * @param {number} month
   * @param {number} year
   */
  function generateDays(month, year) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); // Espacios vacíos antes del inicio del mes
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  function getMonthName(monthIndex) {
    return monthNames[monthIndex];
  }
  function generateDaysAdjusted(month, year) {
    const days = generateDays(month, year);
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start

    for (let i = 0; i < offset; i++) {
      days.unshift(null);
    }

    return days;
  }
  
</script>
<main class="p-4">
  <div class="text-center mb-4">
    <div class="flex items-center justify-between mb-2 gap-4">
      <button 
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        on:click={() => {
          if ($currentMonth === 0) {
            $currentMonth = 11;
            $currentYear--;
          } else {
            $currentMonth--;
          }
        }}>
        Anterior
      </button>
      <h2 class="text-2xl font-bold text-blue-900">
        {getMonthName($currentMonth)} {$currentYear}
      </h2>
      <button 
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        on:click={() => {
          if ($currentMonth === 11) {
            $currentMonth = 0;
            $currentYear++;
          } else {
            $currentMonth++;
          }
        }}>
        Siguiente
      </button>
    </div>
  </div>

  <div class="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700">
    <div>Lun</div>
    <div>Mar</div>
    <div>Mié</div>
    <div>Jue</div>
    <div>Vie</div>
    <div>Sáb</div>
    <div>Dom</div>
  </div>

  <div class="grid grid-cols-7 gap-2 mt-2">
    {#each generateDaysAdjusted($currentMonth, $currentYear) as day}
      {#if day !== null}
        <button 
          type="button"
          class="day px-3 py-2 text-center border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          on:click={() => selectDate(day)}
          aria-label="Select date {day}">
          {day}
        </button>
      {:else}
        <div class="day border border-transparent"></div>
      {/if}
    {/each}
  </div>
</main>



  
  


  