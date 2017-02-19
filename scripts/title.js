define(["scripts/libs/only", "scripts/htmlUtils", "scripts/popups"], function (only, htmlUtils, popups) {

    var header = {
        "text-align": "center",
        "font-size": "30px",
        margin: "0px"
    };

    var timeTag = only.html({p: "Year: " + 1750, css: header});
    var pause = only.html({button: "Pause", class: "fancyButton"})
    var html = htmlUtils.spacedColumns([pause, timeTag, {div: ""}], [0.04, 0.90, 0.06]);

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
    }

    return {
        setup: setup,
        html: html,
        update: title
    }

})
