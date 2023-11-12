export interface ApiResponse {
    code: number;
    message: string;
    error?: {
        message: string;
        code: number;
    };
}

export interface ApiResponseWithToken extends ApiResponse {
    token?: string;
}

export interface CombinedApiResponse {
    code: number;
    message: string;
    error?: {
        message: string;
        code: number;
    };
    token?: string;
}