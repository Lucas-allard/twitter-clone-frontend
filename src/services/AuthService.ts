import {LOGIN_URL, SIGNUP_URL} from "../config/apiConfig.ts";
import httpModule from "../utils/httpModule.ts";
import {ApiResponse, ApiResponseWithToken, Credentials} from "../types";

const AuthService = {
    login: (credentials: Credentials): Promise<ApiResponseWithToken> => httpModule.post({url: LOGIN_URL, body: credentials}),
    signup: (credentials: Credentials): Promise<ApiResponse> => httpModule.post({url: SIGNUP_URL, body: credentials}),
    logout: (): void => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
    },
    isAuthenticated: (): boolean => {
        const token: string | undefined = document.cookie.split(";").find((cookie) => cookie.includes("token"))
        return !!token;
    }
};

export default AuthService;
