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

    function rightColumn(state, poln,finstate) {
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
            var dat;
            if (key == "pollution") {
                dat = only.html({p: key + ": " + new Intl.NumberFormat('en-US', { maximumFractionDigits: 4}).format(1 - poln / (state[key] + poln ))+"("+new Intl.NumberFormat('en-US', { maximumFractionDigits: 4}).format(1 - poln / (finstate[key] + poln ))+")"});
            }
            else if (key=="trees"){
                dat = only.html({p: key + ": " + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0}).format(state[key]) +"("+ new Intl.NumberFormat('en-US', { maximumFractionDigits: 0}).format(finstate[key])+")" });
            } else {
              dat = only.html({p: key + ": " + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0}).format(state[key])  });
            }
            if(state[key]!=0 || key=="trees"){
              data.push(dat);
          }
            var barPercent;
            if (key == "trees") {
                barPercent = (state[key]) / 100000000
                data.push(makeProgessBar(barPercent, 25, "#ff0000", "#4CAF50", myProgress, myBar))
            }
            if (key == "pollution") {
                barPercent = (1 - poln / (state[key] + poln ));
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
