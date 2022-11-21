import axios from 'axios';
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});


axios.interceptors.request.use(function (config) { // Do something before request is sent
    const token = TokenService.getLocalAccessToken();
    if (token) { // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
}, function (error) { // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(
    (res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
}, 
    async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/auth/signin' && err.response) {
        originalConfig._retry = true;

        try {
            const rs = await instance.post("/auth/refreshtoken", {
                refreshToken: TokenService.getLocalRefreshToken(),
            });

            const {accessToken} = rs.data;
            TokenService.updateLocalAccessToken(accessToken);

            return instance(originalConfig);

        } catch (_error){
            return Promise.reject(_error);
        }
    }
    
    return Promise.reject(err);
});
