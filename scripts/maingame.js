define(["scripts/libs/only","scripts/htmlUtils", "scripts/leftColumn"], function(only,htmlUtils,leftColumn){
  function displayGame(left, right){
    var col1 = left;
    var col2 = {div: [{img: "", src:"images/world_map_round_sticker-rb9b44a9415d4402691baa75521f6214d_v9waf_8byvr_512.jpg"}]}
    var col3 = right;
    only.setHtml([
      {title: "Sustainable NYUS"},
      htmlUtils.spacedColumns([col1,col2,col3],[.33,.33,.33])
    ])
  }

  return {
    displayGame: displayGame
  }
})
