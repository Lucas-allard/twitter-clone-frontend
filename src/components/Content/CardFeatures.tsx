import Wrapper from "../Wrapper/Wrapper.tsx";
import {IconBookmark, IconHeart, IconMessageCircle, IconRefresh, IconShare} from "@tabler/icons-react";
import {useModal} from "../../context/ModalContex.tsx";
import {Like, Comment} from "../../types";
import {FC, ReactElement} from "react";

interface CardFeaturesProps {
    likes: Array<Like>;
    comments: Array<Comment>;
    postRetweets: number;
}

const CardFeatures: FC<CardFeaturesProps> = (
    {
        likes,
        comments,
        postRetweets
    }: CardFeaturesProps
): ReactElement => {
    const {openModal} = useModal();
    const ICON_SIZE: number = 24;
    const features : string[] = [
        "comments",
        "retweets",
        "likes"
    ];
    const getClassNameForIcon = (feature: string): string | undefined => {
        switch (feature) {
            case "likes":
                return "stroke-white group-hover:stroke-red-500 transition duration-300 ease-in-out";
            case "retweets":
                return "stroke-white group-hover:stroke-green-500 transition duration-300 ease-in-out";
            case "comments":
                return "stroke-white group-hover:stroke-blue-500 transition duration-300 ease-in-out";
            default:
                return undefined;
        }
    }
    const getClassNameForIconWrapper = (feature: string): string | undefined => {
        switch (feature) {
            case "likes":
                return "w-8 h-8 flex justify-center items-center group-hover:bg-red-500/25 rounded-full transition duration-300 ease-in-out";
            case "retweets":
                return "w-8 h-8 flex justify-center items-center group-hover:bg-green-500/25 rounded-full transition duration-300 ease-in-out";
            case "comments":
                return "w-8 h-8 flex justify-center items-center group-hover:bg-blue-500/25 rounded-full transition duration-300 ease-in-out";
            default:
                return undefined;
        }
    }
    const getClassNameForValue = (feature: string): string | null => {
        switch (feature) {
            case "likes":
                return "text-white group-hover:text-red-500 group-hover:font-bold transition duration-300 ease-in-out";
            case "retweets":
                return "text-white group-hover:text-green-500 group-hover:font-bold transition duration-300 ease-in-out";
            case "comments":
                return "text-white group-hover:text-blue-500 group-hover:font-bold transition duration-300 ease-in-out";
            default:
                return null;
        }
    }
    const getIconForFeature = (feature: string): ReactElement | null => {
        switch (feature) {
            case "likes":
                return <IconHeart
                    size={ICON_SIZE}
                    className={getClassNameForIcon(feature)}
                />;
            case "retweets":
                return <IconRefresh
                    size={ICON_SIZE}
                    className={getClassNameForIcon(feature)}
                />;
            case "comments":
                return <IconMessageCircle
                    size={ICON_SIZE}
                    className={getClassNameForIcon(feature)}
                />;
            default:
                return null;
        }
    }
    const getValueForFeature = (feature: string): number | null => {
        switch (feature) {
            case "likes":
                return likes.length;
            case "retweets":
                return postRetweets;
            case "comments":
                return comments.length;
            default:
                return null;
        }
    }
    const getActionForFeature = (feature: string): (() => void) | undefined => {
        switch (feature) {
            case "likes":
                return () => {
                };
            case "retweets":
                return () => {
                };
            case "comments":
                return () => openModal("comments");
            default:
                return undefined;
        }
    }

    const featuresIcons: Array<{
        value: number | null;
        icon: ReactElement | null;
        iconWrapperClassName: string | undefined;
        valueClassName: string | null;
        onClick: (() => void) | undefined;
    }> = features.map((feature) => (
        {
            value: getValueForFeature(feature),
            icon: getIconForFeature(feature),
            iconWrapperClassName: getClassNameForIconWrapper(feature),
            valueClassName: getClassNameForValue(feature),
            onClick: getActionForFeature(feature)
        }
    ));

    return (
        <Wrapper className="flex flex-row justify-between items-center pt-4">
            <Wrapper className="w-full flex flex-row justify-between items-center">
                {featuresIcons.map((feature, index) => (
                        <Wrapper
                            className="flex flex-row items-center cursor-pointer group hover:bg-opacity-40"
                            key={index}
                            onClick={feature.onClick}
                        >
                            <Wrapper className={feature.iconWrapperClassName}>
                                {feature.icon}
                            </Wrapper>
                            <span className={`ml-2 ${feature.valueClassName} bg-opacity-20`}>
                                {feature.value}
                            </span>
                        </Wrapper>
                    )
                )}
            </Wrapper>
            <Wrapper className="w-full flex flex-row justify-end items-center">
                <Wrapper
                    className="mx-2 w-8 h-8 cursor-pointer flex justify-center items-center group hover:bg-blue-500/25 rounded-full transition duration-300 ease-in-out">
                    <IconBookmark size={ICON_SIZE}
                                  className="stroke-white group-hover:stroke-blue-500 transition duration-300 ease-in-out"/>
                </Wrapper>
                <Wrapper
                    className="mx-2 w-8 h-8 cursor-pointer flex justify-center items-center group hover:bg-blue-500/25 rounded-full transition duration-300 ease-in-out">
                    <IconShare size={ICON_SIZE}
                               className="stroke-white group-hover:stroke-blue-500 transition duration-300 ease-in-out"/>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
}

export default CardFeatures;