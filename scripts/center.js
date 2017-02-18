define(["scripts/libs/only"], function(only){
  var earth = only.html({img: "", src: "images/world_map_round_sticker-rb9b44a9415d4402691baa75521f6214d_v9waf_8byvr_512.jpg"});

  var canvas = only.html({canvas: ""});
  var ctx = canvas.getContext("2d");

  /*dimentions looks like:
  {x: centerX, y: centerY, width: proportionWidth, height: proportionHeight, angle: angle}*/
  function drawImage(image, dimentions){
    var pixelsWide = dimentions.width * canvas.width;
    var pixelsTall = dimentions.height * canvas.height;
    var pixelsToCenterX = dimentions.x * canvas.width;
    var pixelsToCenterY = dimentions.y * canvas.height;

    ctx.save();
    ctx.translate( pixelsToCenterX, pixelsToCenterY );
    ctx.rotate( dimentions.angle );
    ctx.translate( -pixelsWide/2, -pixelsTall/2 );
    ctx.drawImage( image, 0, 0 , pixelsWide, pixelsTall);
    ctx.restore();

    ctx.drawImage(image, 0, 0, 10, 10);
  }

  var angle = 0.0;
  function update(state) {
    var height = canvas.parentNode.offsetHeight - 10;
    var width = canvas.parentNode.offsetWidth - 10;
    var better = Math.min(height, width);
    canvas.height = better;
    canvas.width = better;

    drawImage(earth, {
      x: .5, y:.5, width: 1, height: 1, angle: angle
    })
    angle += .01;
  }
  return {
    html: canvas,
    update: update
  }
})
