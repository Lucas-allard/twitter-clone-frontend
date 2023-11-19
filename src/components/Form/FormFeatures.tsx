import Wrapper from "../Wrapper/Wrapper.tsx";
import Label from "./Label.tsx";
import {IconGif, IconMoodSmile, IconPhoto} from "@tabler/icons-react";
import Input from "./Input.tsx";
import Modal from "../Modal/Modal.tsx";
import GifPicker from "../Commons/GifPicker.tsx";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import {useModal} from "../../context/ModalContex.tsx";
import {IGif} from "@giphy/js-types";
import {FC, FormEvent, ReactElement} from "react";
import {Image} from "../../types";
import {BlobServiceClient, BlockBlobUploadHeaders} from "@azure/storage-blob";

interface FormFeaturesProps {
    setSelectedGifs: (gifs: (prevGifs: IGif[]) => IGif[]) => void;
    setValue: (value: (prevValue: string) => string) => void;
    setImages: (images: (prevImages: Image[]) => Image[]) => void;
}
const FormFeatures: FC<FormFeaturesProps> = ({setSelectedGifs, setValue, setImages }: FormFeaturesProps): ReactElement => {
    const ICON_SIZE = 18;
    const ICON_COLOR = 'rgb(59 130 246)';
    const {openModal, closeModal} = useModal();

    const onGifClick = (gif: IGif): void => {
        setSelectedGifs((prevGifs) => [...prevGifs, gif]);
        setImages((prevImages) => [...prevImages, {
            url: gif.images.fixed_height.url,
            alt: gif.title,
        }]);
        closeModal();
    }

    const onSmileyClick = (emojiData: EmojiClickData, _event: MouseEvent): void => {
        setValue((prevValue) => prevValue + emojiData.emoji);
        closeModal();
    }

    const onImageChange = async (event: FormEvent<HTMLInputElement>): Promise<void> => {
        const {files}: { files: FileList | null } = event.currentTarget;
        if (!files) return;

        const uploadedImages: Image[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            try {
                const uploadedImage = await uploadImage(file);
                console.log(uploadedImage)
                // uploadedImages.push(uploadedImage);
            } catch (error : any) {
                console.error(`Error uploading image: ${error.message}`);
            }
        }

        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }

    const uploadImage = async (file: File): Promise<BlockBlobUploadHeaders> => {
        const blobService = new BlobServiceClient(import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobService.getContainerClient('myfiles');
        await containerClient.createIfNotExists({
            access: 'container',
        });
        const blobName = `${Date.now()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const options = {
            blobHTTPHeaders: {
                blobContentType: file.type,
            },
        }
        return await blockBlobClient.uploadData(file, options);
    }

    return (
        <Wrapper className="flex flex-row justify-between items-center gap-3">
            <Wrapper
                className="w-8 h-8 flex justify-center items-center hover:bg-blue-500/25 rounded-full transition duration-300 ease-in-out">
                <Label className={"cursor-pointer"} htmlFor="image">
                    <IconPhoto
                        size={ICON_SIZE}
                        color={ICON_COLOR}
                        className="cursor-pointer"
                    />
                </Label>
                <Input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    onChange={onImageChange}
                />
            </Wrapper>
            <Wrapper
                className="w-8 h-8 flex justify-center items-center hover:bg-blue-500/25 rounded-full transition duration-300 ease-in-out">
                <IconGif
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                    className="cursor-pointer"
                    onClick={() => openModal("gif")}
                />
                <Modal modalType="gif">
                    <GifPicker onGifClick={onGifClick}/>
                </Modal>
            </Wrapper>
            <Wrapper
                className="w-8 h-8 flex justify-center items-center hover:bg-blue-500/25 rounded-full transition duration-300 ease-in-out">
                <IconMoodSmile
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                    className="cursor-pointer"
                    onClick={() => openModal("smiley")}
                />
                <Modal modalType="smiley">
                    <Wrapper className="w-full h-full my-2">
                        <EmojiPicker
                            width="100%"
                            onEmojiClick={onSmileyClick}
                        />
                    </Wrapper>
                </Modal>
            </Wrapper>
        </Wrapper>
    )
}

export default FormFeatures;