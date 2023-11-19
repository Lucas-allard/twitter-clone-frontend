import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store.ts";
import {Credentials, LoginResponse, SignupResponse, User, UserResponse} from "../../types";
import AuthService from "../../services/AuthService.ts";

const handleAuthFulfilled = (state: UserState, action: PayloadAction<LoginResponse | SignupResponse>) => {
    const {data} = action.payload;
    const {token, user} = data as { token: string; user: User };
    const expires: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
    document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}`;
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
};

export const signup: AsyncThunk<SignupResponse, Credentials, {}> = createAsyncThunk(
    'user/signup',
    async (credentials: Credentials): Promise<SignupResponse> => {
        return await AuthService.signup(credentials)
    }
)

export const login: AsyncThunk<LoginResponse, Credentials, {}> = createAsyncThunk(
    'user/login',
    async (credentials: Credentials): Promise<LoginResponse> => {
        return await AuthService.login(credentials)
    }
);

export const getUser: AsyncThunk<UserResponse, string | undefined, {}> = createAsyncThunk(
    'user/getUser',
    async (username: string | undefined): Promise<UserResponse> => {
        return await AuthService.getUser(username)
    }
);

interface UserState {
    user: User | null,
    error: {
        message: string,
        code: number
    } | null,
    loading: boolean
}

const initialState: UserState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state: UserState) => {
            AuthService.logout()
            state.user = null
            localStorage.removeItem('user');
            location.reload();
        }
    },
    extraReducers: {
        [signup.fulfilled.type]: (state: UserState, action: PayloadAction<SignupResponse>) => {
            handleAuthFulfilled(state, action);
        },
        [signup.rejected.type]: (state: UserState, action: PayloadAction<undefined, string, any, Error>) => {
            const {message, code}: { message: string, code: number } = JSON.parse(action.error.message)
            state.error = {message, code}
            return state
        },
        [login.fulfilled.type]: (state: UserState, action: PayloadAction<LoginResponse>) => {
            handleAuthFulfilled(state, action);
        },
        [login.rejected.type]: (state: UserState, action: PayloadAction<undefined, string, any, Error>) => {
            const {message, code}: { message: string, code: number } = JSON.parse(action.error.message)
            state.error = {message, code}
            return state
        },
        [getUser.pending.type]: (state: UserState) => {
            state.loading = true
            return state
        },
        [getUser.fulfilled.type]: (state: UserState, action: PayloadAction<UserResponse>) => {
            const {data} = action.payload
            state.user = data as User
            state.loading = false
            return state
        },
        [getUser.rejected.type]: (state: UserState, action: PayloadAction<undefined, string, any, Error>) => {
            const {message, code}: { message: string, code: number } = JSON.parse(action.error.message)
            state.error = {message, code}
            state.user = null
            state.loading = true
            return state
        },
    }
})

export const {logout} = userSlice.actions
export const selectUser = (state: RootState) => state.user.user
export const selectUserError = (state: RootState) => state.user.error

export const selectUserLoading = (state: RootState) => state.user.loading

export default userSlice.reducer