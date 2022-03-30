import React from 'react';
import ChangeLanguageForm from '../../components/account/ChangeLanguageForm';
import useModal from '../core/useModal';

function useChangeLanguage() {
    const {openModal, closeModal} = useModal();

    const changeLanguage = () => {
        openModal(<ChangeLanguageForm />, 'Change Language');
    };

    return changeLanguage;
}

export default useChangeLanguage;
