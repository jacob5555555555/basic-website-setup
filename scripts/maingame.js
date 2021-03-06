define(["scripts/libs/only","scripts/htmlUtils", "scripts/leftColumn","scripts/center", "scripts/popups"],
  function(only,htmlUtils,leftColumn,center, popups){
    function displayGame(title, left, right){
      var col1 = left;
      var col2 = center.html;
      var col3 = right;

      only.setHtml([
        {title: "Natural Balance"},
          title,
        htmlUtils.spacedColumns([col1,col2,col3],[.33,.33,.33]),
        popups.html
      ])
      document.body.style.backgroundColor = "#FFFFD0";
    }

    return {
        displayGame: displayGame


    }
})
