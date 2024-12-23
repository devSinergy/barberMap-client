// @ts-nocheck
import apiCalendar from "../axiosCalendar";

export const getCalendar = async (barbershopid) =>{
    try {
        const response = await apiCalendar.get(`/${barbershopid}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener los horarios:', error);
        throw error;
    }
}

export const addEspecialDay = async (barbershopid,especialday) =>{
    try {
        const response = await apiCalendar.put(`/${barbershopid}`,{especialday})
        return response.data
    } catch (error) {
        console.error('Error al añadir un dia especial:', error);
        throw error;
    }
}