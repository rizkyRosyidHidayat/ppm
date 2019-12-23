import axios from 'axios'

const http = axios.create({
    baseURL: 'http://ppm.amikom.ac.id/api/',    
})

export default http