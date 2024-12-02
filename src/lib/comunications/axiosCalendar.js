import axios from "axios";

const apiCalendar = axios.create({
    baseURL:'https://barbermap-server.onrender.com/calendar',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
});

apiCalendar.interceptors.response.use(
    (response) =>{
        return response },
    (error) =>{
        return Promise.reject(error)}

)

export default apiCalendar;