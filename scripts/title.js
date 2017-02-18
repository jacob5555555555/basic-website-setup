define(["scripts/libs/only"], function (only) {

    var header = {
        "text-align": "center",
        "font-size": "30px"
    };

    var html = only.html({div: []});
    var timeTag = only.html({p: "Time: " + 0, css: header});
    html.appendChild(timeTag);

    function title(state) {



        timeTag.innerHTML = "Time: " + state.time;

        // html.appendChild();

    }

    return {
        html: html,
        update: title
    }

})
