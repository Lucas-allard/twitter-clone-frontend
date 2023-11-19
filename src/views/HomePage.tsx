import {FC, ReactElement, useEffect, useState} from 'react';
import {IconSettings} from '@tabler/icons-react';
import {useAppDispatch, useAppSelector} from '../hooks.ts';
import {AppDispatch} from '../store.ts';
import {getAllTweets, selectTweetLoading, selectTweets} from '../features/tweet/tweetSlice.ts';
import {Tweet} from '../types';
import {ModalProvider} from '../context/ModalContex.tsx';
import AppContainer from '../components/Commons/AppContainer.tsx';
import Loading from '../components/Commons/Loading.tsx';
import Modal from '../components/Modal/Modal.tsx';
import SearchPanel from '../components/Sidebar/SearchPanel.tsx';
import SidebarMenu from '../components/Sidebar/SidebarMenu.tsx';
import TweetCard from '../components/Content/TweetCard.tsx';
import TweetForm from '../components/Form/TweetForm.tsx';
import Wrapper from '../components/Wrapper/Wrapper.tsx';

type Tab = 'home' | 'subscriptions'
const HomePage: FC = (): ReactElement => {
    const [activeTab, setActiveTab] = useState<Tab>('home')
    const tweets: Tweet[] = useAppSelector(selectTweets);
    const loading: boolean = useAppSelector(selectTweetLoading);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllTweets())
    }, []);

    return (
        <AppContainer>
            <ModalProvider>
                <SidebarMenu/>
                <Modal modalType="tweet">
                    <TweetForm/>
                </Modal>
            </ModalProvider>
            <main>
                <Wrapper className="w-full flex flex-row justify-between items-center border-b border-gray-600">
                    <ul className="w-full flex flex-row justify-around text-white">
                        <li
                            className="w-full flex justify-center cursor-pointer hover:bg-white/10"
                            onClick={() => setActiveTab('home')}
                        >
                        <span className={`mx-auto py-4 ${activeTab === 'home' ? 'border-b-2 border-blue-500' : ''}`}>
                          Pour vous
                        </span>
                        </li>
                        <li
                            className="w-full flex justify-center cursor-pointer hover:bg-white/10 "
                            onClick={() => setActiveTab('subscriptions')}
                        >
                        <span
                            className={`mx-auto py-4 ${activeTab === 'subscriptions' ? 'border-b-2 border-blue-500' : ''}`}>
                            Abonnements
                        </span>
                        </li>
                    </ul>
                    <Wrapper className="p-2 mx-2 rounded-full hover:bg-white/10">
                        <IconSettings color="white" size={24} className="cursor-pointer"/>
                    </Wrapper>
                </Wrapper>
                <ModalProvider>
                    <Wrapper className="w-full border-b border-gray-600">
                        <TweetForm/>
                    </Wrapper>
                    {loading && <Loading/>}
                    {!loading && tweets.map((tweet: Tweet) => (
                        <TweetCard
                            key={tweet.id}
                            tweet={tweet}
                            className="w-full p-4 border-b border-gray-600"
                        />
                    ))}
                </ModalProvider>
            </main>
            <SearchPanel/>
        </AppContainer>
    )
}

export default HomePage;