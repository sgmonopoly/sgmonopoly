'use strict'
import axios from 'axios'

const getMapInfo = () => {
    return axios.get('/base/mapInfo')
}

const getHeroInfo = () => {
    return axios.get('/base/heroInfo')
}

const getSituationInfo = () => {
    return axios.get('/base/situationInfo')
}

const getSuggestionInfo = () => {
    return axios.get('/base/suggestionInfo')
}

export {getMapInfo,getHeroInfo,getSituationInfo,getSuggestionInfo}