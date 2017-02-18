define(["scripts/libs/only"], function(only){
  var html = only.html({div: []});
  function leftColumn(buttonObject){
    var buttons = [];
    for (var key in buttonObject){
      var button = only.html({button: key, css: {display: "block"}});
      button.addEventListener("click",buttonObject[key]);
      buttons.push(button);
    }
    var final = only.html({div: buttons});
    html.appendChild(final);
  }

  return {
    html:html,
    onClicks: leftColumn
  }
})
