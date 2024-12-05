import axios from "axios";

const apiReviews = axios.create({
    baseURL:'https://barbermap-server.onrender.com/reviews',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});

apiReviews.interceptors.response.use(
    (response) =>{
        return response },
    (error) =>{
        return Promise.reject(error)}

)

export default apiReviews;