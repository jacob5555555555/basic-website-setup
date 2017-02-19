define(["scripts/libs/only"], function(only){
  //html pieces
  //var earth = only.html({img: "", src: "images/world_map_round_sticker-rb9b44a9415d4402691baa75521f6214d_v9waf_8byvr_512.jpg"});
var earth = only.html({img: "", src: "images/world.png"});
  var tree = only.html({img: "", src: "images/tree.png"})

  var canvas = only.html({canvas: ""});
  var ctx = canvas.getContext("2d");

  function makeSpriteDrawer(image, maximum){
    var count = 0;
    var locations = [];

    return {
      setDensity: function(density){
        count = Math.ceil(density * maximum);
        if (count < locations.length){
          locations = locations.slice(0, count);
        } else if (count > locations.length){
          for (var i = 0; i < (count - locations.length); ++i){
            locations.push(Math.random() * Math.PI * 2);
          }
        }
      },
      draw: function(){
        locations.forEach(function(angle){
          drawAroundEarth(image, angle);
        })
      }
    }
  }
  var trees = makeSpriteDrawer(tree, 20);

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

  }

  function drawAroundEarth(image, angle){
    drawImage(image, {
      x: .5 + .4 * Math.cos(angle),
      y: .5 + .4 * Math.sin(angle),
      width: .1,
      height: .1,
      angle: angle + Math.PI/2
    })
  }

  function update(state) {
    var height = canvas.parentNode.offsetHeight - 10;
    var width = canvas.parentNode.offsetWidth - 10;
    var better = Math.min(height, width);
    if (canvas.height != better || canvas.width != better){
      canvas.height = better;
      canvas.width = better;
    }
    //ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFD0";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    drawImage(earth, {
      x: .5, y:.5, width: 1, height: 1, angle: 0
    })

    trees.setDensity(state.trees / 100000000);
    trees.draw();

  }
  return {
    html: canvas,
    update: update
  }
})
