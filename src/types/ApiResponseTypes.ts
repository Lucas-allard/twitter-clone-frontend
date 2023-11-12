export interface ApiResponse {
    code: number;
    message: string;
}

export interface ApiResponseWithToken extends ApiResponse {
    token?: string;
}

export interface CombinedApiResponse {
    code: number;
    message: string;
    token?: string;
}