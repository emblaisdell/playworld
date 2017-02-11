imageNames = ["trophy","patch-outside","patch-inside"];
images = {};

// TODO: Get loot info from DB
loot = [{type:"trophy",text:"test",primColor:"#0000FF",secColor:"#0000BB"},{type:"patch",text:"winning"}];

$(window).on("load", function(){
	imageNames.forEach(function(name,i){
		images[name] = $("#"+name)[0];
		console.log(images[name]);
	})

	loot.forEach(function(item,index){
		newCol = $('<div class="col-md-3"></div>').appendTo($("#loot-row"));
		newCanvas = $('<canvas class="loot-canvas" width=256 height=256></canvas>').appendTo(newCol);
		c = newCanvas[0]
		ctx = c.getContext("2d");
		switch(item.type){
			case "trophy":
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(images.trophy, 0, 0, c.width, c.height);
				ctx.imageSmoothingEnabled = true;
				ctx.fillStyle = item.secColor;
				ctx.font = "bold 64px sans-serif";
				ctx.textAlign = "center"
				ctx.fillText(item.text, 0.5*c.width, 0.76*c.height);
				ctx.fillStyle = item.primColor;
				ctx.fillText(item.text, 0.5*c.width, 0.75*c.height)
				break;
			case "patch":
				
		}
	})
})