//该文件中为一些辅助函数
/*
Game.model 是定义在src/game.js中的全局模型
返回"draw"表示平局结束
返回"X"表示玩家X取得胜利
返回"Y"表示玩家Y取得胜利
返回"continue"表示游戏未结束
*/

function validate() {
    // 检查每一行
    for(var i = 0; i < Game.map_grid.row; i++)
      if((Game.model[i][0] !== "origin") && (Game.model[i][0] === Game.model[i][1]) && (Game.model[i][1] === Game.model[i][2])){
        return Game.model[i][0]; //返回的是X或Y，即该玩家取胜。
      }

    // 检查每一列
    for(var i = 0; i < Game.map_grid.column; i++)
      if((Game.model[0][i] !== "origin") && (Game.model[0][i] === Game.model[1][i]) && (Game.model[2][i] === Game.model[0][i])){
        return Game.model[0][i]; //返回的是X或Y，即该玩家取胜。
      }

    //检查两条对角线
    if((Game.model[0][0] !== "origin") && (Game.model[0][0] === Game.model[1][1]) && (Game.model[1][1] === Game.model[2][2])){
      return Game.model[0][0]; //返回的是X或Y，即该玩家取胜。
    }
    if((Game.model[0][2] !== "origin") && (Game.model[0][2] === Game.model[1][1]) && (Game.model[1][1] === Game.model[2][0])){
      return Game.model[0][2]; //返回的是X或Y，即该玩家取胜。
    }

    //若函数到此处尚未退出，则无人获胜，检查是否棋盘已经填满，若填满则为平局，否则就可以继续游戏。
    for(var i = 0; i < Game.map_grid.row; i++)
      for(var j = 0; j < Game.map_grid.column; j++)
        if(Game.model[i][j] === "origin") return "continue";  //只要有任何一个块还是origin，则表示未填满。

    //完成所有检查，平局！
    return "draw";
}
