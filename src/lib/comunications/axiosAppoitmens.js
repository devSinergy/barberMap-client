
import axios from "axios";

const apiAppoitmens = axios.create({
    baseURL:'https://barbermap-server.onrender.com/appoitmens',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});

apiAppoitmens.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>  { 
        return Promise.reject(error)
    }
)

export default apiAppoitmens;