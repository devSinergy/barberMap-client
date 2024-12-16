// @ts-nocheck
// +page.js
import jwt_decode from 'jwt-decode'; // Importación correcta de la función por defecto
import { goto } from '$app/navigation';

export async function load() {
  // Si estamos en el navegador
  if (typeof window !== 'undefined') {
    // Obtener el AuthToken desde localStorage
    const authToken = localStorage.getItem('Authtoken');
    
    // Si el token existe, intentar decodificarlo
    if (authToken) {
      try {
        // Decodificar el JWT
        const decoded = jwt_decode(authToken);
        
        // Extraer el barbershopid del token decodificado, si existe
        const barbershopid = decoded.barbershopid || null;
        
        return {
          barbershopid, // Enviar el barbershopid al componente
        };
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return {
          barbershopid: null, // Si ocurre un error, enviar null
        };
      }
    }else {
      goto('/');
    }
  }
}



