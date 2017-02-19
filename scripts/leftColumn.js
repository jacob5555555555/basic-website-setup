define(["scripts/libs/only", "scripts/htmlUtils"], function(only, htmlUtils){
  function makeButton(name, description,detail){
    var button = only.html({button: name, css: {display: "block"}, class: "fancyButton"});
    var subtract = only.html({button: "-", class: "fancyButton"})
    button.addEventListener("click",description.add);
    subtract.addEventListener("click", description.subtract);
    button.title=detail;

    var cost = "";
    for (var resource in description.cost){
      cost += description.cost[resource] + " ";
      cost += resource + ", ";
    }
    cost = cost.slice(0, cost.length-2);

    return {
      html: htmlUtils.spacedColumns([
        button,
        subtract,
        {p: [{font: cost, size:"2"}]}
      ], [.4, .1, .5]),
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
      var description = buttonObject[key].description;
      var detail = buttonObject[key].detail;
      var data = makeButton(key, description,detail);
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
      data.html.style.opacity = data.description.canAdd() || data.description.canSubtract()? 1.0: 0.3;
      data.subtractButton.disabled = !data.description.canSubtract();
      data.button.disabled = !data.description.canAdd();
    }
  }

  return {
    html:html,
    setup: setup,
    update: update
  }
})
