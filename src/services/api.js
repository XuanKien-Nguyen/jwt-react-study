import axios from 'axios';
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});


axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
