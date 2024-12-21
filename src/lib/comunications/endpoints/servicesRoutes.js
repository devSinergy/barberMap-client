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

export const deleteService = async (id) => {
    try {
        const token = localStorage.getItem('Authtoken'); // Obtén el token del localStorage
        const response = await apiService.delete(`/${id}`, {
            headers: {
                authorization: `Bearer ${token}`, // Incluye el token en los headers
            },
        });
        const message = response.data.message;
        return message;
    } catch (error) {
        console.error('Error al eliminar la cita:', error.response?.data || error.message);
        throw error; // Opcional: lanzar el error para manejarlo en el llamado
    }
};