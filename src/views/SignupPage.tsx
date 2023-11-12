import {FC, ReactElement, useState} from 'react';
import {Credentials} from "../types";
import Wrapper from "../components/Wrapper/Wrapper.tsx";
import AuthenticationContainer from "../components/Commons/AuthenticationContainer.tsx";

const SignupPage: FC = (): ReactElement => {
    const [credentials, setCredentials] = useState<Credentials>({
        name: '',
        username: '',
        email: '',
        password: ''
    } as Credentials);
    return (
        <Wrapper className="bg-black flex flex-row justify-center items-center gap-12 w-screen 2xl:h-screen text-white">
            <Wrapper className="hidden 2xl:block w-1/3 text-[300px] text-right font-black-ops-one">
                X
            </Wrapper>
            <Wrapper className="py-8 w-screen mx-auto 2xl:w-2/3 flex flex-col justify-center items-center gap-12">
                <h1 className="text-3xl text-center max-w-screen-md break-words">
                    Inscrivez vous et communiquez avec vos amis</h1>
               <AuthenticationContainer
                   initialCredentials={credentials}
                   setCredentials={setCredentials}
                   isLogin={false}
                />
            </Wrapper>
        </Wrapper>
    )
}

export default SignupPage;