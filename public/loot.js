imageNames = ["trophy","patch-outside","patch-inside"];
images = {};

// TODO: Get loot info from DB
loot = [
	{type:"trophy",text:"test",primColor:"0,0,255",secColor:"0,0,127"},
	{type:"patch",text:"Winning",primColor:"0,0,255",secColor:"0,127,0"},
	{type:"trophy",text:"You're Mom",primColor:"255,0,0",secColor:"255,127,0"}
];

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
				ctx.fillStyle = cssColor(item.secColor);
				ctx.font = "bold 48px sans-serif";
				ctx.textAlign = "center"
				ctx.fillText(item.text, 0.5*c.width, 0.76*c.height);
				ctx.fillStyle = cssColor(item.primColor);
				ctx.fillText(item.text, 0.5*c.width, 0.75*c.height)
				break;
			case "patch":
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(images["patch-outside"], 0, 0.325*c.height, c.width, 0.25*c.height);
				ctx.fillStyle = cssColor(item.primColor,0.5);
				ctx.fillRect(0, 0.325*c.height, c.width, 0.25*c.height);
				ctx.drawImage(images["patch-inside"], 0, 0.325*c.height, c.width, 0.25*c.height);
				ctx.fillStyle = cssColor(item.secColor,0.5);
				px = c.width/64;
				ctx.fillRect(3*px, 3*px+0.325*c.height, c.width - 6*px, 0.25*c.height - 6*px);
				ctx.imageSmoothingEnabled = true;
				ctx.fillStyle = cssColor(item.primColor);
				ctx.font = "bold 32px sans-serif";
				ctx.textAlign = "center"
				ctx.fillText(item.text, 0.5*c.width, 0.5*c.height);
				break;
		}
	})
})

function cssColor(param,alpha){
	alpha = alpha || "1";
	return "rgba("+param+","+alpha+")";
}