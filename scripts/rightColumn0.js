define(["scripts/libs/only","scripts/htmlUtils"], function(only,htmlUtils){

    var energy = only.html({p: "Energy: 0"})
    var pollution = only.html({p: "Pollution: 0"})
    var wood = only.html({p: "Wood: 0"})
    var trees = only.html({p: "Trees: 0"})
    var lumberJacks = only.html({p: "LumberJacks: 0"})
    var furnaces = only.html({p: "furnaces: 0"})
    var coal = only.html({p: "Coal: 0"})
    var coalreserves = only.html({p: "coalreserves: 0"})
    var coalmines = only.html({p: "Coalmines: 0"})
    var coalplants = only.html({p: "Coalplants: 0"})


    var html = only.html({
      div: [
        energy,
        pollution,
        wood,
        trees,
        lumberJacks,
        furnaces,
        coal,
        coalreserves,
        coalmines,
        coalplants
      ]
    });

    function setEnergy(num) {
        energy.innerHTML = "Energy: " + num;
    }

    function setPollution(num) {
        pollution.innerHTML = "Pollution: " + num;
    }

    function setWood(num) {
        wood.innerHTML = "Wood: " + num;
    }

    function setTrees(num) {
        trees.innerHTML = "Trees: " + num;
    }
    function setCoal(num) {
        coal.innerHTML = "Coal: " + num;
    }
    function setCoalreserves(num) {
        coalreserves.innerHTML = "Coalreserves: " + num;
    }
    function setCoalplants(num) {
        coalplants.innerHTML = "Coalplants: " + num;
    }
    function setCoalmines(num) {
        coalmines.innerHTML = "Coalmines: " + num;
    }
    function setLumberJacks(num) {
        lumberJacks.innerHTML = "LumberJacks: " + num;
    }
    function setFurnaces(num) {
        furnaces.innerHTML = "Furnaces: " + num;
    }


    return {
        html: html,
        setPollution: setPollution,
        setEnergy: setEnergy,
        setWood: setWood,
        setTrees: setTrees,
        setCoal: setCoal,
        setCoalreserves: setCoalreserves,
        setCoalmines: setCoalmines,
        setCoalplants: setCoalplants,
        setLumberJacks: setLumberJacks,
        setFurnaces: setFurnaces


    }
})
