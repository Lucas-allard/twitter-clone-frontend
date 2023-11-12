import {ChangeEvent, FC, FormEvent, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    CombinedApiResponse,
    Credentials,
    FormErrors,
    ValidateCredentialsParams
} from "../../types";
import AuthService from "../../services/AuthService.ts";
import {getTextForFields, getTypeForFields} from "../../utils/fieldsHelper.ts";
import {validateCredentials} from "../../utils/fieldsValidator.ts";
import Wrapper from "../Wrapper/Wrapper.tsx";
import AuthForm from "../Form/AuthForm.tsx";

interface AuthContainerProps {
    initialCredentials: Credentials;
    setCredentials: (credentials: Credentials) => void;
    isLogin: boolean;
}

const AuthenticationContainer: FC<AuthContainerProps> = ({initialCredentials, isLogin}: AuthContainerProps): ReactElement => {
    const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
    const [errors, setErrors] = useState<FormErrors>({} as FormErrors);

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {name, value}: { name: string; value: string } = event.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const fields: Array<{
        name: string;
        text: string;
        type: string;
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        index: number;
    }> = Object.keys(credentials).map((credential: string, index: number) => ({
        name: credential,
        text: getTextForFields(credential),
        type: getTypeForFields(credential),
        onChange,
        index,
    }));

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const newErrors: FormErrors = validateCredentials({credentials, isLogin} as ValidateCredentialsParams);

        if (Object.keys(newErrors).length > 0) {
           return setErrors(newErrors);
        } else {
            setErrors({} as FormErrors);
        }

        try {
            const {code, token}: CombinedApiResponse = isLogin
                ? await AuthService.login(credentials)
                : await AuthService.signup(credentials);

            if (code === 201 || code === 200 || token) {
                if (isLogin && token) {
                    const age: number = 86400;
                    document.cookie = `token=${token}; path=/; max-age=${age}`;
                }

                window.location.href = isLogin ? '/' : '/login';
            } else {
                setErrors({
                    genericError: 'Réponse inattendue du serveur',
                });
            }
        } catch (e: any) {
            const {message}: Error = JSON.parse(e.message) as Error;

            setErrors({
                genericError: message,
            });
        }
    };

    return (
        <Wrapper className="flex flex-col justify-center items-center gap-12 w-screen text-white">
            <AuthForm buttonText={isLogin ? 'Connexion' : "S'inscrire"} credentials={credentials} errors={errors}
                      fields={fields} onSubmit={onSubmit}/>
            <Wrapper className="flex justify-center items-center">
                <Link to={isLogin ? '/signup' : '/login'} className="button-primary py-2 px-6">
                    {isLogin ? 'Pas encore inscrit ?' : 'Déjà inscrit ? Connectez vous'}
                </Link>
            </Wrapper>
        </Wrapper>
    );
};

export default AuthenticationContainer;