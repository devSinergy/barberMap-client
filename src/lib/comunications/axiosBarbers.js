import axios from 'axios'

const api = axios.create({
    baseURL:'https://barbermap-server.onrender.com/barbers',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
});

api.interceptors.response.use(
    (response) => {
        return response},
    (error) =>{
        return Promise.reject(error)
    }
)

export default api;