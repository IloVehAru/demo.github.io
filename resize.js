function resize(){
	var heights=window.innerHeight;
	var canvas = document.getElementById("gameCanvas");
	var div=document.getElementById("gameArea");
	div.style.height=heights-20+"px";
	div.style.width=(heights)*1080/1920+"px";
	canvas.style.width=div.style.width;
	canvas.style.height=div.style.height;
}
resize();
window.onresize = function() {resize();};

