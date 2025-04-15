import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import BaseModal from "../shared/BaseModal";
import {setLanguageModalOpen} from "../../redux/gameSlice";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LanguageChangeModal = () => {

    const {languageModalOpen} = useSelector(state => state.game);

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setLanguageModalOpen(false));
    };

    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        closeModal();
    };

    const locales = [
        {src: '/ru.svg', name: 'Russian', value: 'ru'},
        {src: '/en.svg', name: 'English', value: 'en'}
    ]

    return <BaseModal
        open={languageModalOpen}
        title={t('change-language')}
        content={
            <Box sx={{ml: 1.5}}>
                {locales.map(l =>
                    <Box sx={{mb: 2.5, display: 'flex'}} onClick={() => changeLanguage(l.value)}>
                        <img width="28" src={l.src} alt={l.name}/>
                        <Typography sx={{ml: 1.5}}>{t(l.value)}</Typography>
                    </Box>
                )}
            </Box>
        }
        onlyPrimary
        primaryButtonText={t('close')}
        onPrimaryAction={closeModal}
        onClose={closeModal}
    />
};

export default LanguageChangeModal;
