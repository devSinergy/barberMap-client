import axios from "axios";

const apiService = axios.create({
    baseURL:'https://barbermap-server.onrender.com/services',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});

apiService.interceptors.response.use(
    (response) =>{
        return response },
    (error) =>{
        return Promise.reject(error)}

)

export default apiService;