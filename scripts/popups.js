define(["scripts/libs/only"], function(only){

  var greyedOut = only.html({
    center: [],
    css: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: "grey",
      top: 0,
      left: 0,
      opacity: 0.85,
      zIndex: 10
    }
  });

  var overlay = only.html({
    center: [greyedOut],
    css: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
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
    html.style.zIndex = 20;
    removeChildren();
    overlay.appendChild(html);
    overlay.appendChild(greyedOut);
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
