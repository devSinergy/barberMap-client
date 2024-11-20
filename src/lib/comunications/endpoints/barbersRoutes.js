import api from "../axios";

export const getBarbers = async () => {
    try {
        const response = await api.get('/'); // Realiza la solicitud al endpoint base
        console.log('Datos de barberos obtenidos:', response.data); // Log de los datos recibidos
        return response.data; // Retorna solo los datos
    } catch (error) {
        console.error('Error al obtener barberos:', error); // Log de cualquier error que ocurra
        throw error; // Propaga el error para manejarlo en niveles superiores
    }
};
