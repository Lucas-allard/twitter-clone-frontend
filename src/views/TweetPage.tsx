import {FC, ReactElement, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ModalProvider} from "../context/ModalContex.tsx";
import SidebarMenu from "../components/Sidebar/SidebarMenu.tsx";
import Modal from "../components/Modal/Modal.tsx";
import TweetForm from "../components/Form/TweetForm.tsx";
import AppContainer from "../components/Commons/AppContainer.tsx";
import Wrapper from "../components/Wrapper/Wrapper.tsx";
import Loading from "../components/Commons/Loading.tsx";
import TweetCard from "../components/Content/TweetCard.tsx";
import CommentForm from "../components/Form/TweetForm.tsx";
import SearchPanel from "../components/Sidebar/SearchPanel.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {AppDispatch} from "../store.ts";
import {getTweet, selectTweet, selectTweetLoading} from "../features/tweet/tweetSlice.ts";
import {Tweet} from "../types";

interface TweetParams {
    [key: string]: string;

    id: string;
}

const TweetPage: FC = (): ReactElement => {
    const {id} = useParams<TweetParams>();
    const dispatch: AppDispatch = useAppDispatch();
    const tweet: Tweet | null = useAppSelector(selectTweet);
    const loading: boolean = useAppSelector(selectTweetLoading);

    useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(getTweet(id));
    }, []);

    return (
        <AppContainer>
            <ModalProvider>
                <SidebarMenu/>
                <Modal modalType="">
                    <TweetForm/>
                </Modal>
            </ModalProvider>
            <main>
                <ModalProvider>
                    {loading && <Loading/>}
                    {tweet && (
                        <Wrapper className="w-full p-4">
                            <TweetCard
                                tweet={tweet as Tweet}
                                className="w-full p-4"
                            />
                            <CommentForm/>
                        </Wrapper>
                        )}
                </ModalProvider>
            </main>
            <SearchPanel/>
        </AppContainer>
    )
}

export default TweetPage;