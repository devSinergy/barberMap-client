import apiCalendar from "../axiosCalendar";

export const getCalendar = async (/** @type {any} */ barbershopid) =>{
    try {
        const response = await apiCalendar.get(`/${barbershopid}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener los horarios:', error);
        throw error;
    }
}