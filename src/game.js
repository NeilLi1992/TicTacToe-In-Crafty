//该文件为游戏的元控制区，同时也是index的入口。
//  在此定义关于此游戏的元信息，然后由start函数进入Loading场景
Game = {
  //Grid的尺寸信息
  map_grid: {
    row: 3,
    column: 3,
    block: {
      //每个块的像素大小
      width: 121,
      height: 121,
    },
    padding: 5, //格子与格子之间的填充间距
  },

  //相关颜色信息
  color: {
    origin: "#FF17FB",
    X: "#5989F1",
    O: "#59F15D",
    endingDialogue: "#000000",
  },

  //当前玩家
  currentPlayer: undefined,

  //记录当前棋局的模型
  model: undefined,

  //表明游戏是否可以进行
  canGo: false,

  //结束消息
  endingMsg: undefined,

  //This is the width of the game board.
  width: function() {
    return this.map_grid.row * this.map_grid.block.width + (this.map_grid.column - 1) * this.map_grid.padding;
  },

  //This is the height of the game board.
  height: function() {
    return this.map_grid.column * this.map_grid.block.width + (this.map_grid.row - 1) * this.map_grid.padding;
  },

  //Initialize and start the game!
  start: function() {
    Crafty.init(Game.width(), Game.height());
    Crafty.scene('Loading');
  },
}

//用于设置结束消息的样式
$text_css = {
  'font-size': '20px',
  'font-family': 'Arial',
  'color': 'white',
  'text-align': 'center'
}
