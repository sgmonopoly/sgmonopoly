/*import {getMapInfo} from '../../../api/rest/game'
import * as _ from 'lodash'

export let map_info = {};

(function () {
    if(_.isEmpty(map_info)){
        getMapInfo()
            .then((res) => {
                map_info = res.data;
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }
})();*/
export const map_info = {
    "1": {"stageId": 1, "stageType": 12, "picPath": "", "stageName": "起点"},
    "2": {"stageId": 2, "stageType": 2, "picPath": "", "stageName": "征兵处"},
    "3": {
        "stageId": 3,
        "stageType": 1,
        "picPath": "",
        "stageName": "南皮",
        "des": "",
        "occupyPrice": 1000,
        "buildPrice": 600,
        "colorFollow": 1,
        "tax1": 500,
        "tax2": 1000,
        "tax3": 2000
    },
    "4": {"stageId": 4, "stageType": 10, "picPath": "", "stageName": "紧急军情"},
    "5": {
        "stageId": 5,
        "stageType": 1,
        "picPath": "",
        "stageName": "代郡",
        "des": "",
        "occupyPrice": 1200,
        "buildPrice": 600,
        "colorFollow": 1,
        "tax1": 600,
        "tax2": 1200,
        "tax3": 2400
    },
    "6": {"stageId": 6, "stageType": 3, "picPath": "", "stageName": "招将处"},
    "7": {
        "stageId": 7,
        "stageType": 1,
        "picPath": "",
        "stageName": "平原",
        "des": "",
        "occupyPrice": 1500,
        "buildPrice": 600,
        "colorFollow": 1,
        "tax1": 750,
        "tax2": 1500,
        "tax3": 3000
    },
    "8": {"stageId": 8, "stageType": 11, "picPath": "", "stageName": "锦囊妙计"},
    "9": {
        "stageId": 9,
        "stageType": 1,
        "picPath": "",
        "stageName": "晋阳",
        "des": "",
        "occupyPrice": 1600,
        "buildPrice": 600,
        "colorFollow": 1,
        "tax1": 800,
        "tax2": 1600,
        "tax3": 3200
    },
    "10": {"stageId": 10, "stageType": 6, "picPath": "", "stageName": "缴税"},
    "11": {
        "stageId": 11,
        "stageType": 1,
        "picPath": "",
        "stageName": "长坂坡",
        "des": "",
        "occupyPrice": 1000,
        "buildPrice": 600,
        "colorFollow": 6,
        "tax1": 500,
        "tax2": 1000,
        "tax3": 2000
    },
    "12": {"stageId": 12, "stageType": 4, "picPath": "", "stageName": "游乐园"},
    "13": {"stageId": 13, "stageType": 10, "picPath": "", "stageName": "紧急军情"},
    "14": {
        "stageId": 14,
        "stageType": 1,
        "picPath": "",
        "stageName": "永安",
        "des": "",
        "occupyPrice": 1200,
        "buildPrice": 600,
        "colorFollow": 2,
        "tax1": 600,
        "tax2": 1200,
        "tax3": 2400
    },
    "15": {"stageId": 15, "stageType": 2, "picPath": "", "stageName": "征兵处"},
    "16": {
        "stageId": 16,
        "stageType": 1,
        "picPath": "",
        "stageName": "桂阳",
        "des": "",
        "occupyPrice": 1500,
        "buildPrice": 600,
        "colorFollow": 2,
        "tax1": 750,
        "tax2": 1500,
        "tax3": 3000
    },
    "17": {"stageId": 17, "stageType": 11, "picPath": "", "stageName": "锦囊妙计"},
    "18": {
        "stageId": 18,
        "stageType": 1,
        "picPath": "",
        "stageName": "江陵",
        "des": "",
        "occupyPrice": 1600,
        "buildPrice": 600,
        "colorFollow": 2,
        "tax1": 800,
        "tax2": 1600,
        "tax3": 3200
    },
    "19": {"stageId": 19, "stageType": 3, "picPath": "", "stageName": "招将处"},
    "20": {
        "stageId": 20,
        "stageType": 1,
        "picPath": "",
        "stageName": "长沙",
        "des": "",
        "occupyPrice": 1800,
        "buildPrice": 600,
        "colorFollow": 2,
        "tax1": 900,
        "tax2": 1800,
        "tax3": 3600
    },
    "21": {"stageId": 21, "stageType": 6, "picPath": "", "stageName": "缴税"},
    "22": {
        "stageId": 22,
        "stageType": 1,
        "picPath": "",
        "stageName": "五丈原",
        "des": "",
        "occupyPrice": 1000,
        "buildPrice": 600,
        "colorFollow": 6,
        "tax1": 500,
        "tax2": 1000,
        "tax3": 2000
    },
    "23": {"stageId": 23, "stageType": 5, "picPath": "", "stageName": "按摩院"},
    "24": {"stageId": 24, "stageType": 10, "picPath": "", "stageName": "紧急军情"},
    "25": {
        "stageId": 25,
        "stageType": 1,
        "picPath": "",
        "stageName": "天水",
        "des": "",
        "occupyPrice": 1500,
        "buildPrice": 600,
        "colorFollow": 3,
        "tax1": 750,
        "tax2": 1500,
        "tax3": 3000
    },
    "26": {"stageId": 26, "stageType": 2, "picPath": "", "stageName": "征兵处"},
    "27": {
        "stageId": 27,
        "stageType": 1,
        "picPath": "",
        "stageName": "西凉",
        "des": "",
        "occupyPrice": 1600,
        "buildPrice": 600,
        "colorFollow": 3,
        "tax1": 800,
        "tax2": 1600,
        "tax3": 3200
    },
    "28": {"stageId": 28, "stageType": 11, "picPath": "", "stageName": "锦囊妙计"},
    "29": {
        "stageId": 29,
        "stageType": 1,
        "picPath": "",
        "stageName": "汉中",
        "des": "",
        "occupyPrice": 1800,
        "buildPrice": 600,
        "colorFollow": 3,
        "tax1": 900,
        "tax2": 1800,
        "tax3": 3600
    },
    "30": {"stageId": 30, "stageType": 3, "picPath": "", "stageName": "招将处"},
    "31": {
        "stageId": 31,
        "stageType": 1,
        "picPath": "",
        "stageName": "成都",
        "des": "",
        "occupyPrice": 2000,
        "buildPrice": 600,
        "colorFollow": 3,
        "tax1": 1000,
        "tax2": 2000,
        "tax3": 4000
    },
    "32": {"stageId": 32, "stageType": 9, "picPath": "", "stageName": "赌馆"},
    "33": {"stageId": 33, "stageType": 8, "picPath": "", "stageName": "金银岛"},
    "34": {
        "stageId": 34,
        "stageType": 1,
        "picPath": "",
        "stageName": "赤壁",
        "des": "",
        "occupyPrice": 1000,
        "buildPrice": 600,
        "colorFollow": 6,
        "tax1": 500,
        "tax2": 1000,
        "tax3": 2000
    },
    "35": {"stageId": 35, "stageType": 2, "picPath": "", "stageName": "征兵处"},
    "36": {
        "stageId": 36,
        "stageType": 1,
        "picPath": "",
        "stageName": "下邳",
        "des": "",
        "occupyPrice": 1600,
        "buildPrice": 600,
        "colorFollow": 4,
        "tax1": 800,
        "tax2": 1600,
        "tax3": 3200
    },
    "37": {"stageId": 37, "stageType": 10, "picPath": "", "stageName": "紧急军情"},
    "38": {
        "stageId": 38,
        "stageType": 1,
        "picPath": "",
        "stageName": "徐州",
        "des": "",
        "occupyPrice": 1800,
        "buildPrice": 600,
        "colorFollow": 4,
        "tax1": 900,
        "tax2": 1800,
        "tax3": 3600
    },
    "39": {"stageId": 39, "stageType": 3, "picPath": "", "stageName": "招将处"},
    "40": {
        "stageId": 40,
        "stageType": 1,
        "picPath": "",
        "stageName": "庐江",
        "des": "",
        "occupyPrice": 2000,
        "buildPrice": 600,
        "colorFollow": 4,
        "tax1": 1000,
        "tax2": 2000,
        "tax3": 4000
    },
    "41": {"stageId": 41, "stageType": 11, "picPath": "", "stageName": "锦囊妙计"},
    "42": {
        "stageId": 42,
        "stageType": 1,
        "picPath": "",
        "stageName": "建业",
        "des": "",
        "occupyPrice": 2200,
        "buildPrice": 600,
        "colorFollow": 4,
        "tax1": 1100,
        "tax2": 2200,
        "tax3": 4400
    },
    "43": {"stageId": 43, "stageType": 6, "picPath": "", "stageName": "缴税"},
    "44": {
        "stageId": 44,
        "stageType": 1,
        "picPath": "",
        "stageName": "濡须口",
        "des": "",
        "occupyPrice": 1000,
        "buildPrice": 600,
        "colorFollow": 6,
        "tax1": 500,
        "tax2": 1000,
        "tax3": 2000
    },
    "45": {"stageId": 45, "stageType": 7, "picPath": "", "stageName": "茅庐"},
    "46": {"stageId": 46, "stageType": 10, "picPath": "", "stageName": "紧急军情"},
    "47": {
        "stageId": 47,
        "stageType": 1,
        "picPath": "",
        "stageName": "新野",
        "des": "",
        "occupyPrice": 1800,
        "buildPrice": 600,
        "colorFollow": 5,
        "tax1": 900,
        "tax2": 1800,
        "tax3": 3600
    },
    "48": {"stageId": 48, "stageType": 2, "picPath": "", "stageName": "征兵处"},
    "49": {
        "stageId": 49,
        "stageType": 1,
        "picPath": "",
        "stageName": "濮阳",
        "des": "",
        "occupyPrice": 2000,
        "buildPrice": 600,
        "colorFollow": 5,
        "tax1": 1000,
        "tax2": 2000,
        "tax3": 4000
    },
    "50": {"stageId": 50, "stageType": 3, "picPath": "", "stageName": "招将处"},
    "51": {
        "stageId": 51,
        "stageType": 1,
        "picPath": "",
        "stageName": "许昌",
        "des": "",
        "occupyPrice": 2200,
        "buildPrice": 600,
        "colorFollow": 5,
        "tax1": 1100,
        "tax2": 2200,
        "tax3": 4400
    },
    "52": {"stageId": 52, "stageType": 11, "picPath": "", "stageName": "锦囊妙计"},
    "53": {
        "stageId": 53,
        "stageType": 1,
        "picPath": "",
        "stageName": "洛阳",
        "des": "",
        "occupyPrice": 2500,
        "buildPrice": 600,
        "colorFollow": 5,
        "tax1": 1250,
        "tax2": 2500,
        "tax3": 5000
    },
    "54": {"stageId": 54, "stageType": 9, "picPath": "", "stageName": "赌馆"},
    "55": {
        "stageId": 55,
        "stageType": 1,
        "picPath": "",
        "stageName": "官渡",
        "des": "",
        "occupyPrice": 1000,
        "buildPrice": 600,
        "colorFollow": 6,
        "tax1": 500,
        "tax2": 1000,
        "tax3": 2000
    },
    "56": {"stageId": 56, "stageType": 6, "picPath": "", "stageName": "缴税"}
};
