define(["scripts/gameManager"], function(gameManager){

  //static game logic
  function runLogic(right, left){
    var ljec= 5;
    var ljeu= 1;
    var ljtu =5;
    var tuwg=1;
    var trgc = .00000001;
    var trmc = 100000000;
    var fuec = 50;
    var fueg = 1;
    var fuwu = 100;
    var fupg=1;
    var podc=.001;
    var pomc= 100000;
    var cmec= 1000;
    var cmwc=500;
    var cmeu=50;
    var cmcg=10;
    var cmpg=2;
    var cpec=2500;
    var cpwc=1000;
    var cpeg=10;
    var cpcu=10;
    var cppg =10;
    var omec =5000;
    var omwc = 2000;
    var omeu = 100;
    var omog =25;
    var ompg =12;
    var smec =10000;
    var smwc =2500;
    var smeu=100;
    var smcu=5;
    var smou=20;
    var smmg =10;
    var smpg=25;
    var somc= 2000;
    var soeg=1000;
    var tico=.01;
    var game = gameManager.makeGameManager();

    var gameState = {
      pollution: 0,
      energy: 100,
      trees: 100000000,
      coal: 100000,
      ore: 100000,
      wood: 0,
      coalreserves:0,
      orereserves:0,
      metal:0,
      time:0,
      lumberJacks: 25,
      furnaces: 1 ,
      coalmines:0,
      coalplants:0,
      oremines:0,
      smelters:0,
      solar:0
    };

    /*
    cost looks like
    {
      energy: 10, wood: 100
    }
    results is a similar object of what gets added
    */
    function makeButton(cost, results){
      function canAdd(){
        for (var resource in cost){
          if (gameState[resource] < cost[resource]){
            return false;
          }
        }
        return true;
      }
      function canSubtract(){
        for (var resource in results){
          if (gameState[resource] < results[resource]){
            return false
          }
        }
        return true;
      }
      return {
        add: game.ifPlaying(function(){
          if (canAdd()){
            for (var resource in cost){
              gameState[resource] -= cost[resource];
            }
            for (var resource in results){
              gameState[resource] += results[resource]
            }
          }
        }),
        subtract: function(){
            if(canSubtract()){
              for (var resource in results){
                gameState[resource] -= results[resource];
              }
            }
        },
        cost: cost,
        canAdd: canAdd,
        canSubtract: canSubtract
      };
    }

    var buttons = {


      hire_lumberjack: makeButton({energy: 5}, {lumberJacks: 1}),
      buy_furnace: makeButton({energy: 50}, {furnaces: 1}),
      buy_coalmine: makeButton({energy: 1000, wood: 500}, {coalmines: 1}),
      buy_coalplant: makeButton({energy: 2500, wood: 1000}, {coalplants: 1}),
      buy_oremine: makeButton({energy: 5000, wood: 2000}, {oremines: 1}),
      buy_smelter: makeButton({energy: 10000, wood:2500}, {smelters: 1}),
      buy_solar: makeButton({metal: 2000}, {solar: 1})

    }

    //actually running it
    left.setup(buttons);

    function loop(){
      //logic
      var ed=0;
      var td=0;
      var wd=0;
      var pd=0;
      var cmd=0;
      var crd=0;
      var md=0;
      var omd=0;
      var ord=0;
      var ljw = Math.min(gameState.trees,gameState.lumberJacks*ljtu)/ljtu;
      var fuw = Math.min(gameState.wood,gameState.furnaces*fuwu);
      var cmw = Math.min(gameState.coal,gameState.coalmines*cmcg)/cmcg;
      var cpw = Math.min(gameState.coalreserves,gameState.coalplants*cpcu);
      var omw = Math.min(gameState.ore,gameState.oremines*omog)/omog;
      var smw = Math.min(gameState.orereserves,Math.min(gameState.coalreserves,gameState.smelters*smcu)*smou/smcu)/smou;
      var tf= tico*Math.pow(gameState.time,1.25);
      var pb= pomc / (pomc+gameState.pollution);
      pd= gameState.coalmines*cmpg + gameState.coalplants*cppg+ gameState.furnaces*fupg +gameState.oremines*ompg+ gameState.smelters*smpg- podc*gameState.pollution;
      td=trgc*gameState.trees*( trmc*pb -gameState.trees)-ljw;
      ed = fuw*fueg+cpw*cpeg+soeg*gameState.solar*pb-ljw*ljeu-cmw*cmeu-omw*omeu-smw*smeu;
      wd=ljw*ljtu-fuw;
      cmd=-cmw*cmcg;
      crd=cmw*cmcg-cpw-smcu*smw;
      omd=-omog*omw;
      ord=omog*omw- smou*smw;
      md= smw*smmg;
      gameState.energy+=ed;
      gameState.wood+=wd;
      gameState.trees+=td;
      gameState.time++;
      gameState.pollution+=pd;
      gameState.coalreserves+=crd;
      gameState.coal+=cmd;
      gameState.ore+=omd;
      gameState.orereserves+=ord;
      gameState.metal+=md;
      //update right

      right.update(gameState,pomc);

      left.update();
    }


    game.runGame(loop);
  }

    return {
      runLogic: runLogic
    }
})
