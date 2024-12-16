<script>
  // @ts-nocheck
  // +page.js
  import jwt_decode from 'jwt-decode'; 
  let menuOpen = false; // Variable para controlar si el menú está abierto o cerrado
  let showDash = false;

  function decodeToken () {
    try {
      const token = localStorage.getItem('Authtoken')
      if(token){
        try {
          const decoded = jwt_decode(token)
          const userRole = decoded.role
          console.log(userRole)
          if(userRole=== 'develop'){
            showDash = true;
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          showDash = false;
        }
    } 

    } catch (error) {
      console.error("Error al ejecutar  la funcion decodetoken")
    }
    
  }
  function toggleMenu() {
    menuOpen = !menuOpen; // Cambia el estado de visibilidad
  }
  decodeToken();
</script>

<main class="bg-gray-900 text-white px-6 py-4">
  <!-- Contenedor principal de la navbar -->
  <nav class="flex items-center justify-between">
    
    <!-- Menú hamburguesa -->
    <div class="lg:hidden">
      <button class="p-2 text-white hover:bg-gray-800 rounded" on:click={toggleMenu}>
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
    <div>
      {#if showDash}
        <a href="/dashboard" class="p-2 text-white hover:bg-gray-800 rounded flex items-center justify-center" aria-label="dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
          </svg>
          
        </a>
      {/if}
    </div>
    
    <!-- Ícono de búsqueda -->
    <div class="flex items-center space-x-4">
      <!-- Buscar: Podrías importar el componente Search aquí en el futuro -->
      <a 
        href="/" 
        class="p-2 text-white hover:bg-gray-800 rounded flex items-center justify-center" 
        aria-label="Ir a la página principal"
      >
  <!-- Ícono de casa -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
      
    </a>

    </div>
    
  </nav>

  <!-- Menú desplegable en dispositivos móviles -->
  <div class={`lg:hidden ${menuOpen ? 'block' : 'hidden'} mt-4`}>
    <a href="/barbershops" class="block py-2 hover:bg-gray-800">Barberias</a>
    <a href="/haircuts" class="block py-2 hover:bg-gray-800">Peinados</a>
    <a href="/about-us" class="block py-2 hover:bg-gray-800">About Us</a>
  </div>
</main>
