import apiStores from "../axiosBarberShop";

export const getBarberShops = async() =>{
    try {
        const response = await apiStores.get('/');
        console.log(response.data)
        return response.data
        
    } catch (error) {
        console.error('Error al obtener barberias:', error); 
        throw error; 
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