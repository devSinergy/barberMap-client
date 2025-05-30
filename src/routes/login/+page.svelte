<script>
// @ts-nocheck

 import "/src/global.css";
  import { sendForm } from "$lib/comunications/endpoints/loginRoutes"; // Asegúrate de que la ruta sea correcta
  import { goto } from '$app/navigation';
  import UserForm from "$lib/components/createuserForm/userForm.svelte";
  let showUserModal = false;
  let loginBackground = "/images/backgrounds/fondologin.jpg";
  let phonenumber = '';
  let password = '';
  let loginType ='';
  let phoneError = '';
  let passwordError = '';
  let loginTypeError = '';
  let showModal = false;
  let modalMessage = '';
  let tokenUser = '';
    
  function decodeJWT(token) {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (err) {
      console.error("Error al decodificar token:", err);
      return null;
    }
  }

  const handleSubmit = async (/** @type {{ preventDefault: () => void; }} */ e) => {
      e.preventDefault();

      let isValid = true;

      // Validación para el número de teléfono
      if (!phonenumber) {
          phoneError = 'El número de teléfono es obligatorio.';
          isValid = false;
      } else if (!/^\d{9}$/.test(phonenumber)) {
          phoneError = 'El número de teléfono debe tener 9 dígitos numéricos.';
          isValid = false;
      } else {
          phoneError = '';
      }

      // Validación para la contraseña
      if (!password) {
          passwordError = 'La contraseña es obligatoria.';
          isValid = false;
      } else {
          passwordError = '';
      }
      if (!loginType) {
          loginTypeError = 'Debes seleccionar si eres barbero o cliente.';
          isValid = false;
      } else {
          loginTypeError = '';
      }

      if (isValid) {
          const formData = { phonenumber, password ,loginType};

          try {
        const response = await sendForm(formData);

        // Leer el token del localStorage
        const tokenKey = loginType === 'cliente' ? 'authUser' : 'Authtoken';
        const token = localStorage.getItem(tokenKey);

        if (token) {
          const decoded = decodeJWT(token);
          const nombre = decoded?.name || (loginType === 'barber' ? 'Barbero' : 'Cliente');
          modalMessage = `Bienvenido, ${nombre}!`;
          showModal = true;

          setTimeout(() => {
            showModal = false;
            if (loginType === 'barber') {
              goto('/dashboard');
            } else if (loginType === 'cliente') {
              goto(`/barbershops/${decoded.barberia}`);
            }
          }, 3000);
        } else {
          alert("Revisa tus datos de acceso.");
        }
      } catch (error) {
        
        alert("Hubo un error al enviar el formulario.");
      }
    }
      
  };

  const openUserModal = () =>{
        showUserModal = true;
    }

    const closeUserModal = () =>{
        showUserModal = false;
    }
 
</script>

<main class="flex flex-col min-h-screen p-1">
  <!-- Sección de Imagen (mitad superior) -->
  <div class="h-1/2 bg-cover bg-center brightness-50">
      <img src={loginBackground} alt="login" class="h-[60vh] w-full rounded-lg ">
  </div>

  <!-- Sección del Formulario (mitad inferior) -->
  <div class="h-1/2 flex items-center justify-center bg-white">
      <form on:submit={handleSubmit} class="max-w-md w-full p-6 border rounded-lg shadow-lg">
          <h2 class="text-3xl font-semibold text-center mb-6  text-black p-2">Login</h2>

          <!-- Campo de Teléfono -->
          <div class="mb-4">
              <label for="phone" class="block text-sm font-medium text-gray-700">Número de Teléfono</label>
              <input
                  id="phone"
                  type="text"
                  bind:value={phonenumber}
                  class="w-full px-4 mt-2 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-gray-900"
                  placeholder="Teléfono"
              />
              {#if phoneError}
                  <p class="text-sm text-red-500 mt-1">{phoneError}</p>
              {/if}
          </div>

          <!-- Campo de Contraseña -->
          <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                  id="password"
                  type="password"
                  bind:value={password}
                  class="w-full mt-2 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="********"
              />
              {#if passwordError}
                  <p class="text-sm text-red-500 mt-1">{passwordError}</p>
              {/if}
          </div>
          <div class="mb-4">
            <span class="block text-l font-medium text-gray-700 mb-4">Selecciona tu tipo de cuenta:</span>
            <div class="flex flex-col justify-around mt-2">
                <div class ="flex flex-row justify-around">
                    <label class="flex items-center mb-2 bg-gray-900 text-white p-3 rounded-lg">
                        <input
                            type="radio"
                            bind:group={loginType}
                            value="barber"
                            class="mr-2"
                        />
                        Soy Barbero
                      </label>
                     <label class="flex items-center mb-2 bg-gray-900 text-white p-3 rounded-lg">
                        <input
                            type="radio"
                            bind:group={loginType}
                            value="cliente"
                            class="mr-2"
                        />
                        Soy Cliente
                     </label>
                </div>
               
                <div>
                {#if loginTypeError}
                    <p class="text-sm text-red-500 mt-1">{loginTypeError}</p>
                {/if}    
                </div>
            
            </div>
            
        </div>
          <!-- Botón de Enviar -->
          <div class="mt-6">
              <button
                  type="submit"
                  class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
              >
                  Iniciar Sesión
              </button>
          </div>
      </form>
  </div>
  <div class="h-1/2 flex items-center justify-center bg-white mb-6">
    <UserForm  showUser={showUserModal} close={closeUserModal}/>
                    <button class="bg-green-600 p-2 rounded-md w-[87%] text-white font-bold" on:click={openUserModal} aria-label="user">
                     Registrate                          
                    </button>
  </div>

  <!-- Modal -->
  {#if showModal}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg text-center items-center flex flex-col">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 class="text-xl font-bold mb-4 mt-4">{modalMessage}</h3>
             
              
          </div>
      </div>
  {/if}
</main>

  
  
  
  