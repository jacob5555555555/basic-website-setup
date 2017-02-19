define(["scripts/libs/only", "scripts/htmlUtils"], function (only, htmlUtils) {

    var header = {
        "text-align": "center",
        "font-size": "30px",
        margin: "0px"
    };

    var timeTag = only.html({p: "Year: " + 1750, css: header});
    var pause = only.html({button: "Pause", class: "fancyButton"})
    var html = htmlUtils.spacedColumns([pause, timeTag], [0.04, 0.96]);

    function title(state) {

        timeTag.innerHTML = "Year: " + new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(1750 + state.time / 15) + " C.E.";

        // html.appendChild();

    }

    function setup(game){
      pause.addEventListener("click", function(){
        if (game.isPaused()){
          pause.innerText = "Pause";
          game.setPaused(false);
        } else {
          pause.innerText = "Play";
          game.setPaused(true);
        }
      })
    }

    return {
        setup: setup,
        html: html,
        update: title
    }

})
