define(["scripts/libs/only"], function(only){
  var html = only.html({div: []});
  function rightColumn(state,poln){
    var data = [];
    for (var key in state){
      if (key != "pollution"){
        var dat = only.html({p: key+": "+state[key] });
      }else {
        var dat = only.html({p: key+": "+ (1-poln/(state[key]+poln ))}  );
      }
      data.push(dat);
    }
    var final = only.html({div: data});
    while(html.hasChildNodes()){
      html.removeChild(html.firstChild);
    }
    html.appendChild(final);
  }

  return {
    html:html,
    update: rightColumn
  }
})
