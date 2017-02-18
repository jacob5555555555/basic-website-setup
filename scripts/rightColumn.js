define(["scripts/libs/only","scripts/htmlUtils"], function(only,htmlUtils){

    var energy = only.html([{p: "Energy: 0"}])
    var pollution = only.html([{p: "Pollution: 0"}])
    var wood = only.html([{p: "Wood: 0"}])
    var trees = only.html([{p: "Trees: 0"}])

    var html = only.html([
        energy,
        pollution,
        wood,
        trees

    ])

    function setEnergy(energyNum) {
        energy = only.html([{p: "Energy: " + energyNum}])
    }

    function setPollution(pollutionNum) {
        pollution = only.html([{p: "Pollution: " + pollutionNum}])
    }

    function setWood(woodNum) {
        wood = only.html([{p: "Wood: " + woodNum}])
    }

    function setTrees(treesNum) {
        trees = only.html([{p: "Trees: " + treesNum}])
    }

    return {
        html: html,
        setPollution: setPollution,
        setEnergy: setEnergy,
        setWood: setWood,
        setTrees: setTrees
    }
})

