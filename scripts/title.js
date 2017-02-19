define(["scripts/libs/only", "scripts/htmlUtils", "scripts/popups"], function (only, htmlUtils, popups) {

    var header = {
        "text-align": "center",
        "font-size": "25px",
        margin: "0px"
    };

    var timeTag = only.html({p: "Year: " + 1750, css: header});
    var pause = only.html({button: "Pause", class: "fancyButton"});
    var about = only.html({button: "About", class: "fancyButton"})
    var html = htmlUtils.spacedColumns([pause, timeTag, about], [0.05, 0.90, 0.05]);

    function title(state) {

        timeTag.innerHTML = "Year: " + new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(1750 + state.time / 15) + " C.E.";

        // html.appendChild();

    }


    function setup(game){
      var resume = only.html({button: "Resume", class: "fancyButton"});
      resume.addEventListener("click", function(){
        game.setPaused(false);
        popups.removePopup();
      })
      pause.addEventListener("click", function(){
        if (!game.isPaused()){
          game.setPaused(true);
          popups.setPopup(resume);
        }
      })
      var str = "Welcome to Earth! You are an omnisc ruler who must power their kingdom";
      about.addEventListener("click", function(){
        game.setPaused(true);
        var text = only.html({div: [
          {div: [
            {p: "Welcome to the"}
          ], css: {
            background: "white",
            border: "solid black 1px"
          }},
          resume
        ]})
        popups.setPopup(text);
      })
    }

    return {
        setup: setup,
        html: html,
        update: title
    }

})
