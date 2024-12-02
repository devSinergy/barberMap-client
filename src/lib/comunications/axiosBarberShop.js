import axios from 'axios'

const apiStores = axios.create({
    baseURL:'https://barbermap-server.onrender.com/barbershops',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
});

apiStores.interceptors.response.use(
    (response) => {
        return response},
    (error) =>{
        return Promise.reject(error)
    }
)

export default apiStores;