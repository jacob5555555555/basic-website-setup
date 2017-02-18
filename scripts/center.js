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
    var h = pixelsTall, w = pixelsWide, angle = dimentions.angle;

    var offsetX = (w/2)*Math.cos(angle + Math.PI/2) + (w/2)*Math.cos(angle - Math.PI);
    var offsetY = (h/2)*Math.sin(angle + Math.PI/2) + (h/2)*Math.sin(angle - Math.PI);

    console.log(offsetX, " " , offsetY)

    var x = pixelsToCenterX + offsetX;
    var y = pixelsToCenterY - offsetY;

    ctx.translate(x,y);
    ctx.rotate(dimentions.angle)
    //ctx.drawImage(image, 0, 0, pixelsWide, pixelsTall);
    ctx.drawImage(image, 0, 0, 10, 10);
  }

  var angle = 0.0;
  function update(state) {
    canvas.height = canvas.parentNode.offsetHeight - 10;
    canvas.width = canvas.parentNode.offsetWidth - 10;

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
