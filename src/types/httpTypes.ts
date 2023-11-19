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
export interface Params {
    url: string;
    body?: any;
}
