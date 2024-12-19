// @ts-nocheck
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

export const updateServices = async(id,updateForm) =>{
    try {
        const token = localStorage.getItem('Authtoken');
        const response = await apiService.put(`/${id}`,updateForm, {
            headers: {
                authorization: `Bearer ${token}`, // Incluye el token en los headers
            },
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const createService = async (serviceForm,barbershopid) =>{
    try {
        const token = localStorage.getItem('Authtoken');
        const  payload = {...serviceForm,barbershopid};
        const response = await apiService.post('/',payload, {
            headers: {
                authorization: `Bearer ${token}`, // Incluye el token en los headers
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}