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
    var siwg=100;
    var siec=10;
    var sicu=5;
    var tico=.01;
    var game = gameManager.makeGameManager();

    var gameState = {
      pollution: 0,
      energy: 100,
      trees: 100000000,
      coal: 250000,
      ore: 250000,
      wood: 0,
      coalreserves: 0,
      orereserves: 0,
      metal:0,
      time:0,
      lumberJacks: 25,
      furnaces: 1 ,
      coalmines:0,
      coalplants:0,
      sawmills:0,
      oremines:0,
      smelters:0,
      solar:0
    };
    var things = {
      pollution: {inputs: {}, outputs: {}},
      energy: {inputs: {}, outputs: {}},
      trees: {inputs: {}, outputs: {}},
      coal: {inputs: {}, outputs: {}},
      ore: {inputs: {}, outputs: {}},
      wood: {inputs: {}, outputs: {}},
      coalreserves:  {inputs: {}, outputs: {}},
      orereserves:  {inputs: {}, outputs: {}},
      metal: {inputs: {}, outputs: {}},
      time: {inputs: {}, outputs: {}},
      lumberJacks: {inputs: {energy: 1, trees: 5}, outputs: {wood:5}},
      furnaces: {inputs: {wood: 50}, outputs: {energy:50,pollution:1}},
      coalmines:{inputs: {energy: 10, coal: 10}, outputs: {coalreserves:10,pollution:5}},
      coalplants:{inputs: {coalreserves:10}, outputs: {energy:50,pollution:10}},
      sawmills:{inputs: {trees:100,coalreserves:1}, outputs: {wood:100}},
      oremines:{inputs: {ore:10, energy:50}, outputs: {orereserves:10,pollution:15}},
      smelters:{inputs: {orereserves:10,coalreserves:5, energy:25}, outputs: {metal:10,pollution:25}},
      solar: {inputs: {}, outputs: {energy:250}}
    }

    /*
    cost looks like
    {
    energy: 10, wood: 100
  }
  results is a similar object of what gets added
  */
  var finalres={};
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


    "Lumberjack": {description: makeButton({energy: 500}, {lumberJacks: 1}),detail: "a lumberjack turns trees into logs"},
    "Furnace": {description: makeButton({energy: 5000}, {furnaces: 1}), detail: "a furnace turns logs into energy"},
    "Coal mine":  {description: makeButton({energy: 100000, wood: 50000}, {coalmines: 1}), detail: "a coal mine extracts coal from the earth"},
    "Coal plant":  {description: makeButton({energy: 250000, wood: 100000}, {coalplants: 1}), detail: "a coal plant turns liberated coal into energy"},
    "Ore mine":  {description: makeButton({energy: 500000, wood: 200000}, {oremines: 1}), detail: "a ore mine extracts ore from the ground"},
    "Smelter":  {description: makeButton({energy: 1000000, wood:250000}, {smelters: 1}), detail: "a smelter turns ore and coal into metal"},
    "Solar":  {description: makeButton({metal: 2000, energy:10000000}, {solar: 1}), detail: "a solar panel harnesses the energy of the sun"},
    "Sawmill":  {description: makeButton({metal: 20}, {sawmills: 1}), detail: "a sawmill to cut wood"}

  }

  //actually running it
  left.setup(buttons);
  title.setup(game);
  function logicmath(datum){
    var deltas={};
    var temset={};
    for(key in datum){
      deltas[key]=0;
      temset[key]=datum[key];
    }
    for(var key in things){
      var k=10000000000;
      for(var inp in things[key].inputs){
        if(things[key].inputs[inp]!=0){
          k=Math.min(k,Math.min(Math.floor( temset[inp]/things[key].inputs[inp]),datum[key]));
        }else{
          k=0;
        }
      }
      k=Math.min(k,datum[key]);

      for(var inp in things[key].inputs){
        temset[inp]-=k*things[key].inputs[inp];
      }
      for(var out in things[key].outputs){
        deltas[out]+=k*things[key].outputs[out];

      }
    }
    var tval =0.00000001 * datum.trees * ( 100000000*100000/(100000+datum.pollution) - datum.trees);
    var pval =.0000001*datum.pollution;
    for(var d in deltas){
      datum[d]=deltas[d]+temset[d];
    }
    datum.trees+=tval;
    datum.pollution-=pval;
    datum.time+=1;

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
    if(gameState.time%20==0){
      finalres= calc(gameState);
    }
    right.update(gameState,pomc,finalres);
    title.update(gameState);
    left.update();
    center.update(gameState);
  }


  game.runGame(loop);
}

return {
  runLogic: runLogic
}
})
