import axios from 'axios';

const getMapInfo = () => {
    return axios.get('/base/mapInfo');
};

const getCardInfo = () => {
    return axios.get('/base/cardInfo');
};

const getSituationInfo = () => {
    return axios.get('/base/situationInfo');
};

const getSuggestionInfo = () => {
    return axios.get('/base/suggestionInfo');
};

export {getMapInfo,getCardInfo,getSituationInfo,getSuggestionInfo}