export interface RequestOptions {
    method: string;
    headers: Record<string, string>
    body?: string;
}

export interface SendRequestOptions {
    url: string;
    method: string;
    body?: any;
}

export interface GetParams {
    url: string;
}
export interface PostParams {
    url: string;
    body: any;
}

export interface PutParams {
    url: string;
    body: any;
}

export interface DeleteParams {
    url: string;
}