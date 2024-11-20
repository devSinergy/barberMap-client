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