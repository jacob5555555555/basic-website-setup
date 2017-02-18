define(["scripts/gameManager"], function(gameManager){

  //static game logic
  function runLogic(right, left){
    var game = gameManager.makeGameManager();

    var gameState = {
      energy: 0,
      lumberJacks: 0
    };


    var buttons = {
      lumberjack: game.ifPlaying(function(){
        gameState.lumberJacks++;
      })
    }

    left.onClicks(buttons);

    //actually running it

    function loop(){
      //logic
      gameState.energy += gameState.lumberJacks;

      //update right
      right.setEnergy(gameState.energy);
    }

    game.runGame(loop);
  }

    return {
      runLogic: runLogic
    }
})
