import apiService from "../axiosServices.js";

export const getServices = async(/** @type {any} */ barbershopid) =>{
    try {
        const response = await apiService.get(`barbershop/${barbershopid}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener los Servicios:', error);
        throw error;
    }
} 