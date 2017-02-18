define(["scripts/libs/only", "scripts/htmlUtils"], function(only, htmlUtils){
  function makeButton(name, description){
    var button = only.html({button: name, css: {display: "block"}});
    var subtract = only.html({button: "-"})
    button.addEventListener("click",description.add);
    subtract.addEventListener("click", description.subtract);
    return {
      html: htmlUtils.spacedColumns([
        button,
        subtract,
        {p: "Cost: " + JSON.stringify(description.cost)}
      ], [.5, .5]),
      description: description,
      button: button,
      subtractButton: subtract
    }
  }


  var html = only.html({div: []});
  var buttonData = [];

  function setup(buttonObject){
    var buttons = [];
    for (var key in buttonObject){
      var description = buttonObject[key];
      var data = makeButton(key, description);
      buttons.push(data.html);
      buttonData.push(data)
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
      data.html.hidden = !data.description.canAdd();
      data.subtractButton.disabled = !data.description.canSubtract();
    }
  }

  return {
    html:html,
    setup: setup,
    update: update
  }
})
