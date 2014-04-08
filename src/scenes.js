//Loading��������game.js�е�start�������롣
// ���б�Ҫ����Դ�����Ժ󣬾ͽ���Game����Ϸ����
Crafty.scene('Loading', function() {
  //Ŀǰֻ��Ҫ��ʼ��Ϸ
  Crafty.load([
    'assets/init2.jpg',
    'assets/circle2.jpg',
    'assets/cross2.jpg',
    ], function() {
      Crafty.sprite(121, 'assets/init2.jpg', {spr_origin: [0, 0]});
      Crafty.sprite(121, 'assets/circle2.jpg', {spr_O: [0, 0]});
      Crafty.sprite(121, 'assets/cross2.jpg', {spr_X: [0, 0]});

      ///////////////////////////Fuck��������һ��Ҫע�⣬���뽫�������д��function()�ڣ�
      //�ű�ʾ�� ������������Ϻ󡿡����Ž����¸��������Ҳ٣�������һ�����ϲ��ҵ�������⣡
      Crafty.scene('Game');
  });

});


//Game����Ϸ������ͬʱҲ������ʵ����Ҫ�Ŀ����߼���
Crafty.scene('Game', function() {
  //����ȫ�ֱ��� ��ǰ���
  Game.currentPlayer = "X";
  //������ά���飬��Ϊģ�ͣ��������У��
  Game.model = new Array(Game.map_grid.row);
  for (var i = 0; i < Game.map_grid.column; i++) {
    Game.model[i] = new Array(Game.map_grid.column);
    for (var j = 0; j < Game.map_grid.column; j++) {
      Game.model[i][j] = "origin";
    }
  }
  //��ս�����Ϣ
  Game.endingMsg = undefined;
  //��Ϸ���Կ�ʼ����
  Game.canGo = true;

  //�������ϲ���9������λ��
  for (var x = 0; x < Game.map_grid.row; x++) {
    for (var y = 0; y < Game.map_grid.column; y++) {
      // ֻҪ����x, y����Ϊw,h��component���Ѿ��̶����ˡ�
      Crafty.e('Block').at(x, y);

    }
  }

  // �󶨼��鷽��
  this.validate = this.bind('Validate', function(){
    //���ö�����src/helper.js�еĸ�������
    switch(validate()) {
      //��֤���������Ϸ���Լ���
      case "continue":
        break;

      //���Xȡʤ
      case "X":
        console.log("X wins");
        Game.canGo = false;
        Game.endingMsg = "Player X has won!";
        Crafty.scene('Ending');
        break;

      //���Oȡʤ
      case "O":
        console.log("O wins");
        Game.canGo = false;
        Game.endingMsg = "Player O has won!";
        Crafty.scene('Ending');
        break;

      //ƽ�ֽ�����Ϸ
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

//��������
Crafty.scene('Ending', function() {
  //���ƶԻ��򱳾�
  Crafty.e('2D, DOM, Color, Mouse')
      .attr({x: Game.width()/6 - 10 , y: Game.height()/6, w: Game.width()/1.5 + 20, h: Game.height()/1.5})
      .color(Game.color.endingDialogue);

  //��������
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
