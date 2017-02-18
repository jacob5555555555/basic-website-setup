define(["scripts/libs/only"], function(only){
  function spacedColumns(elements, values){
    var tds = [];
    for (var i = 0; i < elements.length; ++i){
      var td = only.html({td: elements[i],
        css: {
          width: (values[i]*100) + "%"
        }});
      tds.push(td);
    }
    var table = only.html({table: [
      {tr: tds,
        css: {width: "100%"}},
    ],
      css: {width: "100%"}});
    return table;
  }

  return {
    spacedColumns: spacedColumns
  }
})
