define([], function(){
function makeGameManager(){
    //constants:
    var TICK_TIME = 100;//millis


    var playing = false;
    function runGame(loopFunction){
      playing = true;
      var interval = setInterval(function(){
        if (playing){
          loopFunction();
        }
      }, TICK_TIME)
    }
    function ifPlaying(callback){
      return function(){
        if (playing){
          callback();
        }
      };
    }
    function setPaused(isPaused){
      playing = !isPaused
    }
    function isPaused(){
      return !playing;
    }
    return {
      ifPlaying: ifPlaying,
      runGame: runGame,
      setPaused: setPaused,
      isPaused: isPaused
    }
  }

  return {
    makeGameManager: makeGameManager
  }
})
