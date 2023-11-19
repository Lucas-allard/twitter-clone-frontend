import {Credentials} from "../types";

export const getTextForFields = (key: keyof Credentials): string => {
    switch (key) {
        case 'name':
            return 'Nom';
        case 'username':
            return 'Nom d\'utilisateur';
        case 'email':
            return 'Email';
        case 'password':
            return 'Mot de passe';
        case 'bio':
            return 'Bio';
        case 'image':
            return 'photo de profil';
        default:
            return 'Label';
    }
}

export const getTypeForFields = (key: keyof Credentials): string => {
    switch (key) {
        case 'email':
            return 'email';
        case 'password':
            return 'password';
        case 'image':
            return 'file';
        default:
            return 'text';
    }
}
