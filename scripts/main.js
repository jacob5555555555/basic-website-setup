define(["scripts/leftColumn","scripts/rightColumn", "scripts/gameLogic", "scripts/maingame"],
  function(leftColumn, rightColumn, gameLogic, maingame){
    maingame.displayGame(leftColumn.html, rightColumn.html);
    gameLogic.runLogic(rightColumn, leftColumn);
})
