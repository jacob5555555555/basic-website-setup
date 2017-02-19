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
      var str = "<b>Welcome to Earth!</b> You are the human race, and you must generate energy to power your world. \n" +
          "As you shall soon see, this is no easy task...\n" +
          "As in real life, you have a <b>limited number of resources</b>, some of which are renewable, " +
          "some of which aren't, but all must be retrieved from the environment using various mechanisms. " +
          "Once retrieved, these resources may be used to either generate energy or to build more machines " +
          "that in the long term will make energy generation more efficient.\n" +
          "To operate your world, you are given a set of buttons that allow you to <b>buy/build/hire</b> the various items " +
          "and destroy whatever items you have bought/built/hired. " +
          "You are encouraged to \"spam\" some of those buttons.\n" +
          "The real challenge of this task lies in mitigating the negative effects of your resource extraction " +
          "and energy generation on the world's natural environment. You will have a gauge on your total pollution, " +
          "and <b>if you pollute too much</b>, the world will become hostile to human life, thus losing the game. " +
          "Furthermore, <b>if your energy amount falls to zero</b>, that will also cause you to lose the game, as the human race " +
          "is unable to operate without energy.\n" +
          "This all might seem daunting at first, but with persistence and a constant advance towards <b>sustainability</b>, " +
          "success is within reach!\n" +
          "We wish you the best of luck and the <b>brightest</b> of futures!"
      var strings = str.split("\n");
      var paragraphs = [];
      for (var i = 0; i < strings.length; ++i) {
          paragraphs.push(only.html({p: strings[i]}));
      }

      about.addEventListener("click", function(){
        game.setPaused(true);
        var text = only.html({div: [
          {div: paragraphs, css: {
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
