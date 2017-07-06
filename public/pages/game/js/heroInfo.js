/**
 * Created by yuanxiang on 7/4/17.
 */
import {getHeroInfo} from '../../../api/rest/game'
import * as _ from 'lodash'

export let hero_info = {};

(function () {
    if(_.isEmpty(map_info)){
        getHeroInfo()
            .then((res) => {
                hero_info = res.data;
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }
})();

/*

export const hero_info = {
    "1": {
        "cardId": 1,
        "cardName": "孙权",
        "suit": 3,
        "point": 1,
        "atk": 1900,
        "def": 2000,
        "cardType": 1,
        "duty": 1,
        "picPath": "",
        "des": ""
    },
    "2": {
        "cardId": 2,
        "cardName": "丁奉",
        "suit": 3,
        "point": 2,
        "atk": 1550,
        "def": 1600,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "3": {
        "cardId": 3,
        "cardName": "黄盖",
        "suit": 3,
        "point": 3,
        "atk": 1600,
        "def": 1550,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "4": {
        "cardId": 4,
        "cardName": "凌统",
        "suit": 3,
        "point": 4,
        "atk": 1500,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "5": {
        "cardId": 5,
        "cardName": "甘宁",
        "suit": 3,
        "point": 5,
        "atk": 1700,
        "def": 1650,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "6": {
        "cardId": 6,
        "cardName": "吕蒙",
        "suit": 3,
        "point": 6,
        "atk": 1800,
        "def": 1700,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "7": {
        "cardId": 7,
        "cardName": "周泰",
        "suit": 3,
        "point": 7,
        "atk": 1750,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "8": {
        "cardId": 8,
        "cardName": "太史慈",
        "suit": 3,
        "point": 8,
        "atk": 1850,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "9": {
        "cardId": 9,
        "cardName": "陆逊",
        "suit": 3,
        "point": 9,
        "atk": 1850,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "10": {
        "cardId": 10,
        "cardName": "周瑜",
        "suit": 3,
        "point": 10,
        "atk": 2000,
        "def": 1800,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "11": {
        "cardId": 11,
        "cardName": "鲁肃",
        "suit": 3,
        "point": 11,
        "atk": 1600,
        "def": 1900,
        "cardType": 1,
        "duty": 3,
        "picPath": "",
        "des": ""
    },
    "12": {
        "cardId": 12,
        "cardName": "宝雕弓",
        "suit": 3,
        "point": 12,
        "atk": 3000,
        "def": 0,
        "cardType": 2,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "13": {
        "cardId": 13,
        "cardName": "烈焰阵",
        "suit": 3,
        "point": 13,
        "atk": 3000,
        "def": 0,
        "cardType": 3,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "14": {
        "cardId": 14,
        "cardName": "董卓",
        "suit": 4,
        "point": 1,
        "atk": 1900,
        "def": 2000,
        "cardType": 1,
        "duty": 1,
        "picPath": "",
        "des": ""
    },
    "15": {
        "cardId": 15,
        "cardName": "潘凤",
        "suit": 4,
        "point": 2,
        "atk": 1550,
        "def": 1600,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "16": {
        "cardId": 16,
        "cardName": "高顺",
        "suit": 4,
        "point": 3,
        "atk": 1600,
        "def": 1550,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "17": {
        "cardId": 17,
        "cardName": "公孙瓒",
        "suit": 4,
        "point": 4,
        "atk": 1500,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "18": {
        "cardId": 18,
        "cardName": "郭汜",
        "suit": 4,
        "point": 5,
        "atk": 1700,
        "def": 1650,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "19": {
        "cardId": 19,
        "cardName": "李傕",
        "suit": 4,
        "point": 6,
        "atk": 1800,
        "def": 1700,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "20": {
        "cardId": 20,
        "cardName": "华雄",
        "suit": 4,
        "point": 7,
        "atk": 1750,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "21": {
        "cardId": 21,
        "cardName": "颜良",
        "suit": 4,
        "point": 8,
        "atk": 1850,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "22": {
        "cardId": 22,
        "cardName": "文丑",
        "suit": 4,
        "point": 9,
        "atk": 1850,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "23": {
        "cardId": 23,
        "cardName": "吕布",
        "suit": 4,
        "point": 10,
        "atk": 2000,
        "def": 1800,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "24": {
        "cardId": 24,
        "cardName": "贾诩",
        "suit": 4,
        "point": 11,
        "atk": 1600,
        "def": 1900,
        "cardType": 1,
        "duty": 3,
        "picPath": "",
        "des": ""
    },
    "25": {
        "cardId": 25,
        "cardName": "方天画戟",
        "suit": 4,
        "point": 12,
        "atk": 3000,
        "def": 0,
        "cardType": 2,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "26": {
        "cardId": 26,
        "cardName": "轰雷阵",
        "suit": 4,
        "point": 13,
        "atk": 3000,
        "def": 0,
        "cardType": 3,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "27": {
        "cardId": 27,
        "cardName": "刘备",
        "suit": 1,
        "point": 1,
        "atk": 1900,
        "def": 2000,
        "cardType": 1,
        "duty": 1,
        "picPath": "",
        "des": ""
    },
    "28": {
        "cardId": 28,
        "cardName": "法正",
        "suit": 1,
        "point": 2,
        "atk": 1550,
        "def": 1600,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "29": {
        "cardId": 29,
        "cardName": "严颜",
        "suit": 1,
        "point": 3,
        "atk": 1600,
        "def": 1550,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "30": {
        "cardId": 30,
        "cardName": "魏延",
        "suit": 1,
        "point": 4,
        "atk": 1500,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "31": {
        "cardId": 31,
        "cardName": "姜维",
        "suit": 1,
        "point": 5,
        "atk": 1700,
        "def": 1650,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "32": {
        "cardId": 32,
        "cardName": "黄忠",
        "suit": 1,
        "point": 6,
        "atk": 1800,
        "def": 1700,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "33": {
        "cardId": 33,
        "cardName": "马超",
        "suit": 1,
        "point": 7,
        "atk": 1750,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "34": {
        "cardId": 34,
        "cardName": "张飞",
        "suit": 1,
        "point": 8,
        "atk": 1850,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "35": {
        "cardId": 35,
        "cardName": "赵云",
        "suit": 1,
        "point": 9,
        "atk": 1850,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "36": {
        "cardId": 36,
        "cardName": "关羽",
        "suit": 1,
        "point": 10,
        "atk": 2000,
        "def": 1800,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "37": {
        "cardId": 37,
        "cardName": "诸葛亮",
        "suit": 1,
        "point": 11,
        "atk": 1600,
        "def": 1900,
        "cardType": 1,
        "duty": 3,
        "picPath": "",
        "des": ""
    },
    "38": {
        "cardId": 38,
        "cardName": "青龙偃月刀",
        "suit": 1,
        "point": 12,
        "atk": 3000,
        "def": 0,
        "cardType": 2,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "39": {
        "cardId": 39,
        "cardName": "八卦阵",
        "suit": 1,
        "point": 13,
        "atk": 3000,
        "def": 0,
        "cardType": 3,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "40": {
        "cardId": 40,
        "cardName": "曹操",
        "suit": 2,
        "point": 1,
        "atk": 1900,
        "def": 2000,
        "cardType": 1,
        "duty": 1,
        "picPath": "",
        "des": ""
    },
    "41": {
        "cardId": 41,
        "cardName": "李典",
        "suit": 2,
        "point": 2,
        "atk": 1550,
        "def": 1600,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "42": {
        "cardId": 42,
        "cardName": "曹仁",
        "suit": 2,
        "point": 3,
        "atk": 1600,
        "def": 1550,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "43": {
        "cardId": 43,
        "cardName": "徐晃",
        "suit": 2,
        "point": 4,
        "atk": 1500,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "44": {
        "cardId": 44,
        "cardName": "夏侯渊",
        "suit": 2,
        "point": 5,
        "atk": 1700,
        "def": 1650,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "45": {
        "cardId": 45,
        "cardName": "张郃",
        "suit": 2,
        "point": 6,
        "atk": 1800,
        "def": 1700,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "46": {
        "cardId": 46,
        "cardName": "庞德",
        "suit": 2,
        "point": 7,
        "atk": 1750,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "47": {
        "cardId": 47,
        "cardName": "夏侯惇",
        "suit": 2,
        "point": 8,
        "atk": 1850,
        "def": 1750,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "48": {
        "cardId": 48,
        "cardName": "许褚",
        "suit": 2,
        "point": 9,
        "atk": 1850,
        "def": 1850,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "49": {
        "cardId": 49,
        "cardName": "典韦",
        "suit": 2,
        "point": 10,
        "atk": 2000,
        "def": 1800,
        "cardType": 1,
        "duty": 2,
        "picPath": "",
        "des": ""
    },
    "50": {
        "cardId": 50,
        "cardName": "司马懿",
        "suit": 2,
        "point": 11,
        "atk": 1600,
        "def": 1900,
        "cardType": 1,
        "duty": 3,
        "picPath": "",
        "des": ""
    },
    "51": {
        "cardId": 51,
        "cardName": "火牛阵",
        "suit": 2,
        "point": 12,
        "atk": 3000,
        "def": 0,
        "cardType": 2,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "52": {
        "cardId": 52,
        "cardName": "青釭剑",
        "suit": 2,
        "point": 13,
        "atk": 3000,
        "def": 0,
        "cardType": 3,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "53": {
        "cardId": 53,
        "cardName": "霸王卡",
        "suit": 5,
        "point": 14,
        "atk": 5000,
        "def": 0,
        "cardType": 4,
        "duty": null,
        "picPath": "",
        "des": ""
    },
    "54": {
        "cardId": 54,
        "cardName": "霸王卡",
        "suit": 6,
        "point": 15,
        "atk": 5000,
        "def": 0,
        "cardType": 4,
        "duty": null,
        "picPath": "",
        "des": ""
    }
};
*/
