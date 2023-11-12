import {ValidateCredentialsParams, FormErrors} from "../types";
import {getTextForFields} from "./fieldsHelper.ts";
export const validateCredentials = ({credentials, isLogin}: ValidateCredentialsParams) => {
    const newErrors: FormErrors = {};
    const validateRequired = (value: string | undefined, name: string): void => {
        if (!value) {
            newErrors[name] = `Le champ "${getTextForFields(name)}" est requis`;
        }
    }

    const validateEmail = (email: string): void => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!regex.test(email) && !isLogin) {
            newErrors.email = 'L\'email n\'est pas valide';
        }
    }

    const validatePassword = (password: string): void => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!passwordRegex.test(password) && !isLogin) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial';
        }
    };

    Object.keys(credentials).forEach((credential: string): void => {
        validateRequired(credentials[credential], credential);
        if (credential === 'password') {
            validatePassword(credentials[credential]);
        } else if (credential === 'email') {
            validateEmail(credentials[credential]);
        }
    });

    return newErrors;
}