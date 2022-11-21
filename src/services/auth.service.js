import api from './api';
import TokenService from "./token.service";


    const login = (username, password) => {
        return api.post('/auth/signin', {
            username, password
        })
        .then(res => {
            if (res.data.accessToken) {
                TokenService.setUser(res.data);
            }

            return res.data;
        })
    }

    const logout = () => {
        TokenService.removeUser();
    }

    const register = (username, email, password) => {
        return api.post('/auth/signup', {
            username, 
            email,
            password
        });
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }

    const AuthService = {
        login, 
        logout, 
        register, 
        getCurrentUser,
    }

export default AuthService;