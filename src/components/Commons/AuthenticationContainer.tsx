import {ChangeEvent, FC, FormEvent, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {Credentials, FormErrors, ValidateCredentialsParams} from '../../types';
import {getTextForFields, getTypeForFields} from '../../utils/fieldsHelper.ts';
import {validateCredentials} from '../../utils/fieldsValidator.ts';
import Wrapper from '../Wrapper/Wrapper.tsx';
import AuthForm from '../Form/AuthForm.tsx';
import {useAppDispatch} from '../../hooks.ts';
import {login, signup} from '../../features/user/userSlice.ts';
import {PayloadAction, SerializedError} from "@reduxjs/toolkit";

interface AuthContainerProps {
    initialCredentials: Credentials;
    setCredentials: (credentials: Credentials) => void;
    isLogin: boolean;
}

const AuthenticationContainer: FC<AuthContainerProps> = (
    {
        initialCredentials,
        isLogin,
    }: AuthContainerProps): ReactElement => {
    const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
    const [errors, setErrors] = useState<FormErrors>({} as FormErrors);
    const dispatch = useAppDispatch();

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

    const performAuthentication = async (action: 'login' | 'signup') => {
        const resultAction = action === 'login' ? await dispatch(login(credentials)) : await dispatch(signup(credentials));

        const handleRejectedAction = (resultAction: PayloadAction<
            unknown,
            string,
            {
                arg: Credentials;
                requestId: string;
                requestStatus: "rejected";
                aborted: boolean;
                condition: boolean;
            } & ({ rejectedWithValue: true; } | ({ rejectedWithValue: false; } & {})),
            SerializedError
        >): void => {
            const error: string | undefined = resultAction.error.message;
            const {message} = JSON.parse(error as string);
            setErrors({genericError: message});
        };

        if (action === 'login' && login.rejected.match(resultAction)) {
            handleRejectedAction(resultAction);
        }

        if (action === 'signup' && signup.rejected.match(resultAction)) {
            handleRejectedAction(resultAction);
        }

    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const newErrors: FormErrors = validateCredentials({credentials, isLogin} as ValidateCredentialsParams);

        if (Object.keys(newErrors).length > 0) {
            return setErrors(newErrors);
        } else {
            setErrors({} as FormErrors);
        }

        isLogin ? await performAuthentication('login') : await performAuthentication('signup');
    };

    return (
        <Wrapper className="flex flex-col justify-center items-center gap-12 w-screen text-white">
            <AuthForm
                buttonText={isLogin ? 'Connexion' : "S'inscrire"}
                credentials={credentials}
                errors={errors}
                fields={fields}
                onSubmit={onSubmit}
            />
            <Wrapper className="flex justify-center items-center">
                <Link to={isLogin ? '/signup' : '/login'} className="button-primary py-2 px-6">
                    {isLogin ? 'Pas encore inscrit ?' : 'Déjà inscrit ? Connectez vous'}
                </Link>
            </Wrapper>
        </Wrapper>
    );
};

export default AuthenticationContainer;
