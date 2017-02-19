define(["scripts/popups", "scripts/libs/only"], function(popups, only){
  function gameOver(){
    var message = only.html({
      div: [
        {p: "You have run out of energy and lost the game."},
        {p: "next time, try to make sure you have enough energy production"},
        {p: "before creating structures that use energy."}
      ], css: {
        background: "white",
        border: "solid black 1px",
        opacity: "1.0"
      }
    });
    popups.setPopup(message);
  }

  return {
    gameOver: gameOver
  }
})
