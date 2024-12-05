import api from "../axiosBarbers";

export const getBarbers = async () => {
    try {
        const response = await api.get('/'); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener barberos:', error); 
        throw error;
    }
};

export const getBarber = async (/** @type {any} */ id) =>{
    try {
        const response = await api.get(`/${id}`);
        return response.data
    } catch (error) {
        console.error('Error al obtener detalles del barbero', error);
        throw error;
    }
}   