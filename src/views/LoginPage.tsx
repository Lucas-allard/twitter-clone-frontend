import {FC, ReactElement, useState} from "react";
import {Credentials} from "../types";
import AuthenticationContainer from "../components/Commons/AuthenticationContainer.tsx";
import Wrapper from "../components/Wrapper/Wrapper.tsx";

const LoginPage: FC = (): ReactElement => {
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        password: ''
    } as Credentials);

    return (
        <Wrapper className="bg-black flex flex-row justify-center items-center gap-12 h-screen w-screen text-white">
            <Wrapper className="hidden 2xl:block w-1/3 text-[300px] text-right font-black-ops-one">
                X
            </Wrapper>
            <Wrapper className="py-8 w-screen mx-auto 2xl:w-2/3 flex flex-col justify-center items-center gap-12">
                <h1 className="text-3xl text-center max-w-screen-md break-words">
                    Connectez vous maintenant !
                </h1>
                <AuthenticationContainer
                    initialCredentials={credentials}
                    setCredentials={setCredentials}
                    isLogin={true}
                />
            </Wrapper>
        </Wrapper>

    )
}

export default LoginPage;