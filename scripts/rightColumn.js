define(["scripts/libs/only"], function(only){
  var html = only.html({div: []});

  function makeProgessBar(value, threshold, precolor, postcolor, myProgress, myBar) {
      var barWidth = 100 * value
      myBar.width = barWidth + '%';
      if (barWidth < threshold) {
          myBar.backgroundColor = precolor;
      }
      else {
          myBar.backgroundColor = postcolor;
      }
      var bar = only.html({div: [{p: ""}, {div: [], css: myBar}], css: myProgress});
      return bar
  }

    function rightColumn(state, poln) {
        var data = [];

        var myProgress = {
            "width": "100%",
            "background-color": "#ddd"
        };
        var myBar = {
            "width": "1%",
            "height": "10px",
            "background-color": "#4CAF50"
        };

        for (var key in state) {
            if (key == "pollution") {
                var dat = only.html({p: key + ": " + (1 - poln / (state[key] + poln ))});
            }
            else {
                var dat = only.html({p: key + ": " + state[key]});
            }
            data.push(dat);
            if (key == "trees") {
                var barPercent = (state[key]) / 100000000
                data.push(makeProgessBar(barPercent, 25, "#ff0000", "#4CAF50", myProgress, myBar))
            }
            if (key == "pollution") {
                var barPercent = (1 - poln / (state[key] + poln ));
                data.push(makeProgessBar(barPercent, 50, "#4CAF50", "#785027", myProgress, myBar))
            }

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
