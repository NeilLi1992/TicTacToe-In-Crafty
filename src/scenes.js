//Loading场景，由game.js中的start函数进入。
// 进行必要的资源加载以后，就进入Game主游戏场景
Crafty.scene('Loading', function() {
  //目前只需要开始游戏
  Crafty.scene('Game');
});


//Game主游戏场景。同时也在这里实现主要的控制逻辑。
Crafty.scene('Game', function() {
  //设置全局变量 当前玩家
  Game.currentPlayer = "X";
  //创建二维数组，作为模型，用于棋局校验
  Game.model = new Array(Game.map_grid.row);
  for (var i = 0; i < Game.map_grid.column; i++) {
    Game.model[i] = new Array(Game.map_grid.column);
    for (var j = 0; j < Game.map_grid.column; j++) {
      Game.model[i][j] = "origin";
    }
  }
  //清空结束消息
  Game.endingMsg = undefined;
  //游戏可以开始进行
  Game.canGo = true;


  //在棋盘上布置9个方块位置
  for (var x = 0; x < Game.map_grid.row; x++) {
    for (var y = 0; y < Game.map_grid.column; y++) {
      // 只要设置x, y，因为w,h在component中已经固定好了。
      Crafty.e('Block').at(x, y);

    }
  }

  this.validate = this.bind('Validate', function(){
    //调用定义在src/helper.js中的辅助函数
    switch(validate()) {
      //验证结果表明游戏可以继续
      case "continue":
        break;

      //玩家X取胜
      case "X":
        console.log("X wins");
        Game.canGo = false;
        Game.endingMsg = "Player X has won!";
        Crafty.scene('Ending');
        break;

      //玩家O取胜
      case "O":
        console.log("O wins");
        Game.canGo = false;
        Game.endingMsg = "Player O has won!";
        Crafty.scene('Ending');
        break;

      //平局结束游戏
      case "draw":
        console.log("Draw");
        Game.canGo = false;
        Game.endingMsg = "End in draw!";
        Crafty.scene('Ending');
        break;

      default:
        //Error happened...
    }
  });
});


//结束场景
Crafty.scene('Ending', function() {
  //绘制对话框背景
  Crafty.e('2D, Canvas, Color, Mouse')
      .attr({x: Game.width()/6 - 10 , y: Game.height()/6, w: Game.width()/1.5 + 20, h: Game.height()/1.5})
      .color(Game.color.endingDialogue);

  //绘制文字
  Crafty.e('2D, Text, DOM')
      .attr({x: 0, y: Game.height()/6 + 20, w: Game.width()})
      .text(Game.endingMsg)
      .css($text_css);

  Crafty.e('2D, Text, DOM, Keyboard')
      .attr({x: 0, y: Game.height()/6 + 20 + 40, w: Game.width()})
      .text("Press any key<br> to restart")
      .css($text_css)
      .bind('KeyDown', function() {
        Crafty.scene('Game');
      });
});
