define(["scripts/libs/only"], function (only) {
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

        var categoryTitle = {
            "text-align" : "center",
            "font-weight" : "bold"
        };

        var myProgress = {
            "width": "100%",
            "background-color": "#ddd"
        };
        var myBar = {
            "width": "1%",
            "height": "10px",
            "background-color": "#4CAF50"
        };

        var outputs = ["energy", "pollution"];
        var naturalResources = ["trees", "coalreserves", "orereserves"];
        var resourcesStockpiled = ["wood", "coal", "ore", "metal"];
        var resourceCollectors = ["lumberjacks", "coalmines", "oremines"];
        var outputMachines = ["furnaces","coalplants","smelters","solar"];

        var outputs = {energy: "Energy", pollution: "Pollution"};
        var naturalResources = {trees: "Trees", coalreserves: "Coal Reserves", orereserves: "Ore Reserves"};
        var resourcesStockpiled = {wood: "Wood", coal: "Coal", ore: "Ore", metal: "Metal"};
        var resourceCollectors = {lumberJacks: "LumberJacks", coalmines: "Coal Mines", oremines: "Ore Mines"};
        var outputMachines = {furnaces: "Furnaces", coalplants: "Coal Plants", smelters: "Smelters", solar: "Solar Panels"};

        var all = only.merge(outputs, naturalResources, resourcesStockpiled, resourceCollectors, outputMachines);

        var categoryStrings = [outputs, naturalResources, resourcesStockpiled, resourceCollectors, outputMachines];

        var categories = [[],[],[],[],[]];
        categories[0].push({p : "Outputs", css: categoryTitle});
        categories[1].push({p : "Natural Resources", css: categoryTitle});
        categories[2].push({p : "Resources Stockpiled", css: categoryTitle});
        categories[3].push({p : "Resource Collectors", css: categoryTitle});
        categories[4].push({p : "Output Machines", css: categoryTitle});

        for (var key in state) {
            var dat;
            if (key == "pollution") {
                dat = only.html({p: all[key] + ": " + new Intl.NumberFormat('en-US', {maximumFractionDigits: 4}).format(1 - poln / (state[key] + poln )) + "(" + new Intl.NumberFormat('en-US', {maximumFractionDigits: 4}).format(1 - poln / (finstate[key] + poln )) + ")",
                  css: {margin: "0px"}});
                categories[0].push(dat);
            }
            else if (key == "trees") {
                dat = only.html({p: all[key] + ": " + new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(state[key]) + "(" + new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(finstate[key]) + ")",
                  css: {margin: "0px"}});
                categories[1].push(dat);
            } else {
                dat = only.html({p: all[key] + ": " + new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(state[key]),
                  css: {
                    margin: "0px"
                  }});
                for (var i = 0; i < categories.length; ++i) {
                    if (categoryStrings[i][key]) {
                        categories[i].push(dat);
                    }
                }
            }
            //   if(state[key]!=0 || key=="trees"){
            //     data.push(dat);
            // }
            var barPercent;
            if (key == "trees") {
                barPercent = (state[key]) / 100000000;
                categories[1].push(makeProgessBar(barPercent, 25, "#ff0000", "#4CAF50", myProgress, myBar));
            }
            if (key == "pollution") {
                barPercent = (1 - poln / (state[key] + poln ));
                categories[0].push(makeProgessBar(barPercent, 50, "#4CAF50", "#785027", myProgress, myBar));
            }

        }
        var allDivs = [];
        for (var i = 0; i < categories.length; ++i) {
            allDivs.push(only.html({div: categories[i]}));
        }


        var final = only.html({div: allDivs});
        while (html.hasChildNodes()) {
            html.removeChild(html.firstChild);
        }
        html.appendChild(final);
    }

    return {
        html: html,
        update: rightColumn
    }
})
