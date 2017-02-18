define(["scripts/libs/only"], function(only){
  var earth = only.html({img: "", src: "images/world_map_round_sticker-rb9b44a9415d4402691baa75521f6214d_v9waf_8byvr_512.jpg"});

  var canvas = only.html({canvas: ""});
  var ctx = canvas.getContext("2d");

  /*dimentions looks like:
  {x: centerX, y: centerY, width: proportionWidth, height: proportionHeight, angle: angle}*/
  function drawImage(image, dimentions){
    var pixelsWide = dimentions.width * canvas.width;
    var pixelsTall = dimentions.height * canvas.height;
    var pixelsToCenterX = dimentions.centerX * canvas.width;
    var pixelsToCenterY = dimentions.centerY * canvas.height;

    ctx.drawImage(image, pixelsToCenterX - pixelsWide/2,
      pixelsToCenterY - pixelsTall/2,
      pixelsWide, pixelsTall);
  }

  function update(state) {
    canvas.height = canvas.parentNode.offsetHeight - 10;
    canvas.width = canvas.parentNode.offsetWidth - 10;

    drawImage(earth, {
      x: .5, y:.5, width: .3, height: .3
    })
  }
  return {
    html: canvas,
    update: update
  }
})
