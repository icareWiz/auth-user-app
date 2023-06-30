import axios from "axios";
require('dotenv').config();

export const axiosInstance = axios.create({
    proxy: {
        host: process.env.FIXIE_HOST,
        port: parseInt(process.env.FIXIE_PORT),
        auth: {
            username: process.env.FIXIE_USERNAME,
            password: process.env.FIXIE_PASSWORD
        }
    }
});