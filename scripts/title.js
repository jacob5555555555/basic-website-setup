define(["scripts/libs/only"], function (only) {

    var header = {
        "text-align": "center",
        "font-size": "30px",
        margin: "0px"
    };

    var html = only.html({div: []});
    var timeTag = only.html({p: "Year: " + 1750, css: header});
    html.appendChild(timeTag);

    function title(state) {

        timeTag.innerHTML = "Year: " + new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(1750 + state.time / 15) + " C.E.";

        // html.appendChild();

    }

    return {
        html: html,
        update: title
    }

})
