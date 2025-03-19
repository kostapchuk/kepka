import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const useTranslationAndDispatch = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return { dispatch, t };
};

export default useTranslationAndDispatch;
