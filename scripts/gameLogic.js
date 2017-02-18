define(["scripts/gameManager", "scripts/center"], function(gameManager, center){

  //static game logic
  function runLogic(title, right, left){
    var ljec= 5;
    var ljeu= 1;
    var ljtu =5;
    var tuwg=1;
    var trgc = .0000000001;
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


      hire_lumberjack: {description: makeButton({energy: 5}, {lumberJacks: 1}),detail: "a lumberjack turns trees into logs"},
      buy_furnace: {description: makeButton({energy: 50}, {furnaces: 1}), detail: "a furnace turns logs into energy"},
      buy_coalmine:  {description: makeButton({energy: 1000, wood: 500}, {coalmines: 1}), detail: "a coal mine extracts coal from the earth"},
      buy_coalplant:  {description: makeButton({energy: 2500, wood: 1000}, {coalplants: 1}), detail: "a coal plant turns liberated coal into energy"},
      buy_oremine:  {description: makeButton({energy: 5000, wood: 2000}, {oremines: 1}), detail: "a ore mine extracts ore from the ground"},
      buy_smelter:  {description: makeButton({energy: 10000, wood:2500}, {smelters: 1}), detail: "a smelter turns ore and coal into metal"},
      buy_solar:  {description: makeButton({metal: 2000}, {solar: 1}), detail: "a solar panel harnesses the energy of the sun"}
    }

    //actually running it
    left.setup(buttons);

    function logicmath(datum){
      var ed=0;
      var td=0;
      var wd=0;
      var pd=0;
      var cmd=0;
      var crd=0;
      var md=0;
      var omd=0;
      var ord=0;
      var ljw = Math.min(datum.trees,datum.lumberJacks*ljtu)/ljtu;
      var fuw = Math.min(datum.wood,datum.furnaces*fuwu);
      var cmw = Math.min(datum.coal,datum.coalmines*cmcg)/cmcg;
      var cpw = Math.min(datum.coalreserves,datum.coalplants*cpcu);
      var omw = Math.min(datum.ore,datum.oremines*omog)/omog;
      var smw = Math.min(datum.orereserves,Math.min(datum.coalreserves,datum.smelters*smcu)*smou/smcu)/smou;
      var tf= tico*Math.pow(datum.time,1.25);
      var pb= pomc / (pomc+datum.pollution);
      pd= datum.coalmines*cmpg + datum.coalplants*cppg+ datum.furnaces*fupg +datum.oremines*ompg+ datum.smelters*smpg- podc*datum.pollution;
      td=trgc*datum.trees*( trmc*pb -datum.trees)-ljw;
      ed = fuw*fueg+cpw*cpeg+soeg*datum.solar*pb*pb-ljw*ljeu-cmw*cmeu-omw*omeu-smw*smeu-(1-Math.pow(pb,.1))*datum.energy;
      wd=ljw*ljtu-fuw;
      cmd=-cmw*cmcg;
      crd=cmw*cmcg-cpw-smcu*smw;
      omd=-omog*omw;
      ord=omog*omw- smou*smw;
      md= smw*smmg;
      datum.energy+=ed;
      datum.wood+=wd;
      datum.trees+=td;
      datum.time++;
      datum.pollution+=pd;
      datum.coalreserves+=crd;
      datum.coal+=cmd;
      datum.ore+=omd;
      datum.orereserves+=ord;
      datum.metal+=md;
    }
    function calc(stat){
      var state={};
      for( key in stat){
        state[key]=stat[key];
      }
      for(var i =0;i<50000;i++){
        logicmath(state)
      }
      return state;
    }

    function loop(){
      //logic
      logicmath(gameState);
      //update right
      var finalres= calc(gameState);
      right.update(gameState,pomc,finalres);
      title.update(gameState);
      left.update();
      center.update();
    }


    game.runGame(loop);
  }

    return {
      runLogic: runLogic
    }
})
