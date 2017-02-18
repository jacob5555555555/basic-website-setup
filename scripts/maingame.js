define(["scripts/libs/only","scripts/htmlUtils"], function(only,htmlUtils){
  var col1 = {div: [{p: "column1"}]}
  var col2 = {div: [{img: "", src:"world_map_round_sticker-rb9b44a9415d4402691baa75521f6214d_v9waf_8byvr_512.jpg"}]}
  var col3 = {div: [{p: "column3"}]}
  only.setHtml([
    {title: "Sustainable NYUS"},
    htmlUtils.spacedColumns([col1,col2,col3],[.33,.33,.33])
  ])
})
