define(["scripts/libs/only","scripts/htmlUtils", "scripts/leftColumn","scripts/center"], function(only,htmlUtils,leftColumn,center){
  function displayGame(title, left, right){
    var col1 = left;
    var col2 = center.html;
    var col3 = right;

    only.setHtml([
      {title: "Sustainable NYUS"},
        title,
      htmlUtils.spacedColumns([col1,col2,col3],[.33,.33,.33])
    ])
    document.body.style.backgroundColor = "#FFFFC0";
  }

  return {
      displayGame: displayGame


  }
})
