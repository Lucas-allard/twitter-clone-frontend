import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store.ts";
import {ApiResponse, ApiResponseWithToken, Credentials, User} from "../../types";
import AuthService from "../../services/AuthService.ts";

export const signup: AsyncThunk<ApiResponse, Credentials, {}> = createAsyncThunk(
    'user/signup',
    async (credentials: Credentials): Promise<ApiResponse> => {
        return await AuthService.signup(credentials)
    }
)

export const login: AsyncThunk<ApiResponseWithToken, Credentials, {}> = createAsyncThunk(
    'user/login',
    async (credentials: Credentials): Promise<ApiResponseWithToken> => {
        return await AuthService.login(credentials)
    }
)
const initialState: User | null = null;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            AuthService.logout()
        },
    },
    extraReducers: {
        [signup.fulfilled.type]: (_state, action: PayloadAction<ApiResponse>) => {
            const {message, code}: ApiResponse = action.payload
            if (code === 200) {
                window.location.href = "/login";
            } else {
                console.log(message, code)
            }
        },
        [signup.rejected.type]: (_state, action: PayloadAction<ApiResponse>) => {
            return action.payload
        },
        [login.fulfilled.type]: (_state, action: PayloadAction<ApiResponseWithToken>) => {
            const {token}: ApiResponseWithToken = action.payload
            const expires: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
            document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}`
            window.location.href = "/";
        },
        [login.rejected.type]: (_state, action: PayloadAction<ApiResponse>) => {
            return action.payload
        },

    }
})

export const {} = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer