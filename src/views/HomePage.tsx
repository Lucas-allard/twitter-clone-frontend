import {FC, ReactElement, useEffect, useState} from "react";
import SearchPanel from "../components/Sidebar/SearchPanel.tsx";
import SidebarMenu from "../components/Sidebar/SidebarMenu.tsx";
import Wrapper from "../components/Wrapper/Wrapper.tsx";
import TweetForm from "../components/Form/TweetForm.tsx";
import Modal from "../components/Modal/Modal.tsx";
import {ModalProvider} from "../context/ModalContex.tsx";
import {IconSettings} from "@tabler/icons-react";
import AppContainer from "../components/Commons/AppContainer.tsx";
import TweetService from "../services/TweetService.ts";
import {Tweet} from "../types";
import TweetCard from "../components/Content/TweetCard.tsx";

type Tab = 'home' | 'subscriptions'
const HomePage: FC = (): ReactElement => {
    const [activeTab, setActiveTab] = useState<Tab>('home')
    const [tweets, setTweets] = useState<Tweet[]>([])

    useEffect(() => {
        const controller: AbortController = new AbortController();
        const fetchTweets = async (): Promise<void> => {
            try {
                const tweetsResponse: Tweet[] = await TweetService.getAll();
                setTweets(tweetsResponse);
            } catch (error: any) {
                console.log(error)
                console.error("Error fetching tweets:", error);
                // Gérer les erreurs de récupération des tweets ici
            }
        };

        fetchTweets();

        return (): void => {
            controller.abort();
        };
    }, []);

    return (
        <AppContainer>
            <ModalProvider>
                <SidebarMenu/>
                <Modal>
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
                <Wrapper className="w-full border-b border-gray-600">
                    <TweetForm/>
                </Wrapper>
                <ModalProvider>
                    {tweets.map((tweet: Tweet) => (
                        <TweetCard
                            key={tweet.id}
                            tweet={tweet}
                        />
                    ))}
                </ModalProvider>
            </main>
            <SearchPanel/>
        </AppContainer>
    )
}

export default HomePage;