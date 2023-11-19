import { LOGIN_URL, SIGNUP_URL } from "../config/apiConfig.ts";
import { Credentials, LoginResponse, SignupResponse } from "../types";
import httpModule from "../utils/httpModule.ts";

const AuthService = {
    login: (credentials: Credentials): Promise<LoginResponse> => httpModule.post({ url: LOGIN_URL, body: credentials }),
    signup: (credentials: Credentials): Promise<SignupResponse> => httpModule.post({ url: SIGNUP_URL, body: credentials }),
    logout: (): void => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    isAuthenticated: (): boolean => {
        const token: string | undefined = document.cookie.split(";").find((cookie) => cookie.includes("token"));
        return !!token;
    },
};

export default AuthService;
