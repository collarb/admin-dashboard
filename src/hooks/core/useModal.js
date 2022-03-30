import {useContext} from 'react';
import {modalContext} from '../../context/ModalContext';

function useModal() {
    const {setOpen, setBody, setTitle} = useContext(modalContext);

    const openModal = (body, title) => {
        setOpen(true);
        setBody(body);
        setTitle(title);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return {openModal, closeModal};
}

export default useModal;
