define(["scripts/libs/only"], function(only){

  var overlay = only.html({
    center: [],
    css: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: "grey",
      top: 0,
      left: 0,
      opacity: 0.85,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      visibility: "hidden"
    }
  });

  function removeChildren(){
    while(overlay.hasChildNodes()){
      overlay.removeChild(overlay.firstChild);
    }
  }

  function setPopup(html){
    removeChildren();
    overlay.appendChild(html);
    overlay.style.visibility = "visible";
  }

  function removePopup(){
    removeChildren();
    overlay.style.visibility = "hidden";
  }

  return {
    html: overlay,
    setPopup: setPopup,
    removePopup: removePopup
  }
})
