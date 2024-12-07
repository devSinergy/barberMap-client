import apiReviews from "../axiosReviews";

export const getStoreReview = async(/** @type {any} */ barbershopid) =>{
    try {
        const response = await apiReviews.get(`/${barbershopid}`)
        return response.data
        
    } catch (error) {
        console.error('Fallo al obtener las valoraciones:', error);
        throw error;
    }
} 

// @ts-ignore
export const showReviews = async(barbershopid) =>{
    try {
        const response = await apiReviews.get(`/reviewsdetail/${barbershopid}`)
        return response.data
    } catch (error) {
        console.error('Fallo al obtener las valoraciones:', error);
        throw error;
    }
}