import {useEffect} from 'react';


const useAutosizeTextarea = (textAreaRef: HTMLTextAreaElement | null, value: string): void => {
    useEffect(() => {
        if (textAreaRef) {
            textAreaRef.style.height = 'auto';

            const scrollHeight = textAreaRef.scrollHeight;
            textAreaRef.style.height = scrollHeight + "px";
        }
    }, [value, textAreaRef])
}

export default useAutosizeTextarea;