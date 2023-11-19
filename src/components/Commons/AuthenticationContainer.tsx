import {ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Credentials, FormErrors, ValidateCredentialsParams} from '../../types';
import {getTextForFields, getTypeForFields} from '../../utils/fieldsHelper.ts';
import {validateCredentials} from '../../utils/fieldsValidator.ts';
import Wrapper from '../Wrapper/Wrapper.tsx';
import AuthForm from '../Form/AuthForm.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks.ts';
import {login, selectUserError, signup} from '../../features/user/userSlice.ts';

interface AuthContainerProps {
    initialCredentials: Credentials;
    setCredentials: (credentials: Credentials) => void;
    isLogin: boolean;
}

const AuthenticationContainer: FC<AuthContainerProps> = (
        {
            initialCredentials,
            isLogin,
        }: AuthContainerProps
    ): ReactElement => {
        const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
        const [errors, setErrors] = useState<FormErrors>({} as FormErrors);
        const error = useAppSelector(selectUserError);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
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

            const response = await (isLogin ? (
                dispatch(login(credentials))
            ) : (
                dispatch(signup(credentials))
            ));

            if (signup.fulfilled.match(response) || login.fulfilled.match(response)) {
                navigate('/home')
            }
        }

        useEffect(() => {
            if (error) {
                const {message}: { message: string } = error;
                setErrors({
                    genericError: message,
                } as FormErrors);
            }
        }, [error]);

        useEffect(() => {
            setErrors({} as FormErrors);
        }, []);

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
    }
;

export default AuthenticationContainer;
