import {
    ApiResponse,
    Params,
    RequestOptions,
    SendRequestOptions
} from "../types";

const updateOptions = (options: RequestOptions): RequestOptions => {
    const updateOptions: RequestOptions = {...options};
    const token: string | undefined = document.cookie.split(';').find(cookie => cookie.includes('token'))
    ?.split('=')[1];
    if (token) {
        updateOptions.headers = {
            ...updateOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return updateOptions;
}
const sendRequest = async <T>({url, method, body}: SendRequestOptions): Promise<ApiResponse<T>> => {
    const options: RequestOptions = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }


    const response: Response = await fetch(url, updateOptions(options));

    if (!response.ok) {
        throw new Error(JSON.stringify({message: response.statusText, code: response.status}));
    }

    const data = await response.json() as T;
    return {data, message: response.statusText, code: response.status} as ApiResponse<T>;
}

const httpModule: {
    post: (params: Params) => Promise<ApiResponse<any>>
    get: (params: Params) => Promise<ApiResponse<any>>
} = {
    post: <T>({ url, body }: Params) => sendRequest<ApiResponse<T>>({ url, method: 'POST', body }),
    get: <T>({ url, body }: Params) => sendRequest<ApiResponse<T>>({ url, method: 'GET', body }),
};

export default httpModule;