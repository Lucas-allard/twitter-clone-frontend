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
        isAuthenticated: () => {
            return AuthService.isAuthenticated()
        }
    },
    extraReducers: {
        [signup.fulfilled.type]: (_state, action: PayloadAction<ApiResponse>) => {
            return {
                message: action.payload.message,
                code: action.payload.code,
            }
        },
        [login.fulfilled.type]: (_state, action: PayloadAction<ApiResponseWithToken>) => {
            return {
                message: action.payload.message,
                code: action.payload.code,
                token: action.payload.token,
            }
        },

    }
})

export const {} = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer