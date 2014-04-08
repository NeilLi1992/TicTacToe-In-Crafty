// The Grid component allows an element to be located
//  on a grid of blocks
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.block.width,
      h: Game.map_grid.block.height,
    });
  },

  // Locate this the entity at the given position on the grid
  at: function(x, y) {
    // 没有给出x，y参数，则范围当前块的位置
    if (x === undefined && y === undefined) {
      return {x: Math.floor(this.x/Game.map_grid.block.width), y: Math.floor(this.y/Game.map_grid.block.height), }
    } else {
      // 给出了x，y参数的话，则设置调用对象的2D组件中的x, y对象
      this.x = x * Game.map_grid.block.width + Game.map_grid.padding * x;
      this.y = y * Game.map_grid.block.width + Game.map_grid.padding * y;


      return this;
    }
  }
});

Crafty.c('Block', {
  //定义块的相关属性
  _state: "origin",

  init: function() {
    this.requires('2D, DOM, Grid, Mouse, spr_origin, Persist')
        // 设置每一块的长与宽，这两个参数是固定的
        .attr({w: Game.map_grid.block.width,  h: Game.map_grid.block.height,})
        // .color(Game.color.origin)
        .bind('Click', function(e) {
          //满足检测条件再进行响应
          if (Game.canGo && e.mouseButton == Crafty.mouseButtons.LEFT && this._state === "origin") {
            if (Game.currentPlayer === "X") {
              //修改色块颜色，块的状态，修改全局模型，更改全局变量 当前玩家
              // this.color(Game.color.X);
              this.removeComponent('spr_origin');
              this.addComponent('spr_X');
              this._state = "X";
              Game.model[this.at().x][this.at().y] = "X"
              Game.currentPlayer = "O";
            } else {
              // this.color(Game.color.O);
              this.removeComponent('spr_origin');
              this.addComponent('spr_O');
              this._state = "O";
              Game.model[this.at().x][this.at().y] = "O";
              Game.currentPlayer = "X";
            }

          //触发状态检查，因为Game.model是全局变量，就不传参数了
          Crafty.trigger('Validate');
          }
        });
  },
});
