define(["scripts/title","scripts/leftColumn","scripts/rightColumn", "scripts/gameLogic", "scripts/maingame"],
  function(title, leftColumn, rightColumn, gameLogic, maingame){
    maingame.displayGame(title.html, leftColumn.html, rightColumn.html);
    gameLogic.runLogic(title, rightColumn, leftColumn);
})
