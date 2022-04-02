const axios = require('axios');

class HttpRequest {
    axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    constructor() {
        // Catch HTTP errors globally
        this.axiosInstance.interceptors.response.use(
            (response) => {
                if (response.status === 200 || response.status === 201) {
                    return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
            },
            (error) => {
                if (!error.response) {
                    return Promise.reject(error.message);
                } else if (error.response.status) {
                    return Promise.reject(error.response.data);
                }
            }
        );
    }

    async get(url, config = undefined) {
        const req = await this.axiosInstance.get(url, config);
        return req.data;
    }
}

exports.RequestInstance = new HttpRequest();