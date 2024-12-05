import apiStores from "../axiosBarberShop";

export const getBarberShops = async() =>{
    try {
        const response = await apiStores.get('/');
        return { success: true, data: response.data };
    } catch (error) {
        // @ts-ignore
        return { success: false, error: error.message || 'Error desconocido' };
    }
}

export const getStoreOne = async(/** @type {any} */ id) =>{
    try {
        const response = await apiStores.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los detalles de la barbería:', error);
        throw error;
    }
}