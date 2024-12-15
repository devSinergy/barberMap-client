// @ts-nocheck
// +page.js
import jwt from 'jsonwebtoken';

export async function load() {
  // Verificar si estamos en el navegador
  if (typeof window !== 'undefined') {
    // Obtener el AuthToken desde localStorage
    const authToken = localStorage.getItem('AuthToken');
    
    // Verificar si el token existe
    if (authToken) {
      try {
        // Decodificar el JWT
        const decoded = jwt.decode(authToken);
        
        // Extraer el barbershopid del token decodificado
        const barbershopid = decoded.barbershopid || null;
        
        return {
          barbershopid, // Enviar el barbershopid al componente
        };
      } catch (error) {
        console.error("Error al decodificar el token", error);
        return {
          barbershopid: null, // Si ocurre un error, enviar null
        };
      }
    }
  }

  // Si no estamos en el navegador o no hay AuthToken, enviar null
  return {
    barbershopid: null,
  };
}


