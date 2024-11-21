<script>
</script>

<main class="bg-gray-900 text-white px-6 py-4">
  <!-- Contenedor principal de la navbar -->
  <nav class="flex items-center justify-between">
    
    <!-- Menú hamburguesa -->
    <div class="lg:hidden">
      <button class="p-2 text-white hover:bg-gray-800 rounded">
        <!-- Ícono de menú (hamburguesa) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Enlaces de navegación para pantallas grandes -->
    <div class="hidden lg:flex space-x-6">
      <a href="/barbershops" class="hover:text-gray-400">Barberias</a>
      <a href="/haircuts" class="hover:text-gray-400">Peinados</a>
      <a href="/about-us" class="hover:text-gray-400">About Us</a>
    </div>
    
    <!-- Logo en el centro -->
    <div >      
    </div>
    
    <!-- Ícono de búsqueda -->
    <div class="flex items-center space-x-4">
      <!-- Buscar: Podrías importar el componente Search aquí en el futuro -->
      <button class="p-2 text-white hover:bg-gray-800 rounded">
        <!-- Ícono de lupa -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a7 7 0 110 14 7 7 0 010-14zm0 0L4 4m0 0" />
        </svg>
      </button>
    </div>
    
  </nav>
</main>