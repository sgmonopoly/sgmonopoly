/**
 * Created by yuanxiang on 4/1/17.
 */
export const game_constants = {
    /*
     地图上的序号对应坐标
     原来的想法,地图上是有个顺序的,实现麻烦,所以先去掉了
     1  2  3  4  5  6  7
     56 13 12 11 10 09 08
     55 14 15 16 17 18 19
     54 25 24 23 22 21 20
     53 26 27 28 29 30 31
     52 37 36 35 34 33 32
     51 38 39 40 41 42 43
     50 49 48 47 46 45 44
     index_map_cood: {
     1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7,
     8: 56, 9: 13, 10: 12, 11: 11, 12: 10, 13: 9, 14: 8,
     15: 55, 16: 14, 17: 15, 18: 16, 19: 17, 20: 18, 21: 19,
     22: 54, 23: 25, 24: 24, 25: 23, 26: 22, 27: 21, 28: 20,
     29: 53, 30: 26, 31: 27, 32: 28, 33: 29, 34: 30, 35: 31,
     36: 52, 37: 37, 38: 36, 39: 35, 40: 34, 41: 33, 42: 32,
     43: 51, 44: 38, 45: 39, 46: 30, 47: 41, 48: 42, 49: 43,
     50: 50, 51: 49, 52: 48, 53: 47, 54: 46, 55: 45, 56: 44
     }
     */
    index_map_cood: {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7,
        8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14,
        15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21,
        22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28,
        29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35,
        36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42,
        43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49,
        50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56
    },
    //节点类型颜色
    stage_type_color: {
        1: {
            1:"#B8008A",
            2:"#999900",
            3:"#B80000",
            4:"#006600",
            5:"#0000B8",
            6:"#9933FF",
        },
        2: "#B88A00",//征兵
        3: "#FF9933",//招将
        4: "#0099FF",//游乐园
        5: "#FF001A",//按摩院
        6: "#5C00B8",//缴税
        7: "#FFE600",//茅庐
        8: "#B85C00",//金银岛
        9: "#3333FF",//赌馆
        10: "#00B82E",//紧急军情
        11: "#005CB8",//锦囊妙计
        12: "#000000"//起点
    },
};