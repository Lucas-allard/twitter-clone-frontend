import {DeleteParams, GetParams, PostParams, PutParams, RequestOptions, SendRequestOptions} from "../types";

const updateOptions = (options: RequestOptions): RequestOptions => {
    const updateOptions: RequestOptions = {...options};
    const token: string | undefined = document.cookie.split(';').find(cookie => cookie.includes('token'))
    if (token) {
        updateOptions.headers = {
            ...updateOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return updateOptions;
}
const sendRequest = async <T>({url, method, body}: SendRequestOptions): Promise<T> => {
    const options: RequestOptions = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response: Response = await fetch(url, updateOptions(options))

    if (!response.ok) {
        const errorMessage = await response.json() as T;
        throw new Error(JSON.stringify(errorMessage));
    }

    return await response.json() as T;
}

const httpModule = {
    get: <T>({ url }: GetParams): Promise<T> => sendRequest<T>({ url, method: 'GET' }),
    post: <T>({ url, body }: PostParams): Promise<T> => sendRequest<T>({ url, method: 'POST', body }),
    put: <T>({ url, body }: PutParams): Promise<T> => sendRequest<T>({ url, method: 'PUT', body }),
    delete: <T>({ url }: DeleteParams): Promise<T> => sendRequest<T>({ url, method: 'DELETE' }),
};
export default httpModule;