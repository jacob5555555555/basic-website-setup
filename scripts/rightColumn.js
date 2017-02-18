define(["scripts/libs/only","scripts/htmlUtils"], function(only,htmlUtils){

    var energy = only.html({p: "Energy: 0"})
    var pollution = only.html({p: "Pollution: 0"})
    var wood = only.html({p: "Wood: 0"})
    var trees = only.html({p: "Trees: 0"})

    var html = only.html({
      div: [
        energy,
        pollution,
        wood,
        trees
      ]
    });

    function setEnergy(energyNum) {
        energy.innerHTML = "Energy: " + energyNum;
    }

    function setPollution(pollutionNum) {
        pollution.innerHTML = "Pollution: " + pollutionNum;
    }

    function setWood(woodNum) {
        wood.innerHTML = "Wood: " + woodNum;
    }

    function setTrees(treesNum) {
        trees.innerHTML = "Trees: " + treesNum;
    }

    return {
        html: html,
        setPollution: setPollution,
        setEnergy: setEnergy,
        setWood: setWood,
        setTrees: setTrees
    }
})
