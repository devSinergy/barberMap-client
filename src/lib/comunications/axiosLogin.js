import axios from "axios";



const apiLogin = axios.create({
    baseURL:'https://barbermap-server.onrender.com/auth',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true
});
apiLogin.interceptors.response.use(
    (response) => {
        return response},
    (error) =>{
        return Promise.reject(error)
    }
)

export default apiLogin;