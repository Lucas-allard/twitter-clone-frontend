export interface Credentials {
    name?: string;
    username?: string;
    email: string;
    password: string;
    [key: string]: string | undefined;
}

export interface ValidateCredentialsParams {
    credentials: Credentials;
    isLogin?: boolean;
}