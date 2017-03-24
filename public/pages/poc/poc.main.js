/**
 * Created by yuanxiang on 3/24/17.
 */
const init = () => {
    var stage = new createjs.Stage("gameView");/*选择舞台的(id)*/
    console.log(stage);
    var text = new createjs.Text("HELLO EASELJS","36px Arial","blue");
    console.log(text);
    stage.addChild(text);
    stage.update();//刷新舞台
};

init();