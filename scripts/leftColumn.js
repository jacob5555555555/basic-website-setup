define(["scripts/libs/only", "scripts/htmlUtils"], function(only, htmlUtils){
  var html = only.html({div: []});
  var buttonData = [];
  function setup(buttonObject){
    var buttons = [];
    for (var key in buttonObject){
      var description = buttonObject[key];
      var button = only.html({button: key, css: {display: "block"}});
      var div = htmlUtils.spacedColumns([
        button,
        {p: "Cost: " + JSON.stringify(description.cost)}
      ], [.5, .5]);
      button.addEventListener("click",description.callback);
      buttons.push(div);
      buttonData.push({
        button: div, description: description
      })
    }
    var final = only.html({div: buttons});
    while(html.hasChildNodes()){
      html.removeChild(html.firstChild);
    }
    html.appendChild(final);
  }

  function update(){
    for (var i = 0; i < buttonData.length; ++i){
      var data = buttonData[i];
      data.button.hidden = !data.description.canAfford();
    }
  }

  return {
    html:html,
    setup: setup,
    update: update
  }
})
