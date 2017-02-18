define(["scripts/libs/only"], function(only){
  function leftColumn(buttonObject){
    var buttons = [];
    for (var key in buttonObject){
      var button = only.html({button: key, css: {display: "block"}});
      button.addEventListener("click",buttonObject[key]);
      buttons.push(button);
    }
    var final = {div: buttons};
    return final;
  }

  return {
    leftColumn: leftColumn
  }
})
