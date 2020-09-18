/*
	Function:ex4
	Author:zjvivi
	BuildDate:2019-9-23
	Version:1.0
*/

var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");


var NUMERALS=[12,1,2,3,4,5,6,7,8,9,10,11];
var MARGINS=20;
var HOUR_MARGINS=100;
var MINUTE_MARGINS=60;

var circle={
	x:canvas.width/2,
	y:canvas.height/2,
	r:canvas.width/4
};
var style={
	color:"blue",
	fontSize:20,
	isFill:false,
	lineWidth:1
};
var line={x0:canvas.width/2,y0:canvas.height/2,x1:0,y1:0,margins:MINUTE_MARGINS};

function drawCircle(circle,style){
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2);
	ctx.lineWidth = style.lineWidth;
	if(!style.isFill){
		ctx.strokeStyle = style.color;
		ctx.stroke();
	}		
	else{
		ctx.fillStyle = style.color;
		ctx.fill();
	}
	ctx.closePath();
}

function drawNumerals(circle,style){
	var numWidth,angle;
	var i=0;
	ctx.font = style.fontSize + "px Arial";
	ctx.fillStyle = style.color;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	// ctx.shadowColor = "yellow";
	// ctx.shadowBlur = "1";
	// ctx.shadowOffsetX = "-2";
	// ctx.shadowOffsetY = "0";
	NUMERALS.forEach(function(item,index){
		num=item;
		angle=-Math.PI/2+index*Math.PI/6;

		ctx.fillText(num, circle.x+Math.cos(angle)*(circle.r-MARGINS),circle.y+Math.sin(angle)*(circle.r-MARGINS));
		
	});
}

function drawHand(line,style,angle,circle){
	ctx.beginPath();
	line.x1=circle.x+Math.cos(angle)*(circle.r-line.margins);
	line.y1=circle.y+Math.sin(angle)*(circle.r-line.margins);
	ctx.moveTo(line.x0, line.y0);
	ctx.lineTo(line.x1, line.y1);
	ctx.lineWidth = style.lineWidth;
	ctx.strokeStyle = style.color;
	ctx.stroke();
	ctx.closePath();
}

function drawHands(){
	var today=new Date();
	var hours=today.getHours();
	var mins=today.getMinutes();
	var seconds=today.getSeconds();
	var angle;

	
	style.lineWidth=1;
	line.margins=MINUTE_MARGINS/2;
	angle=-Math.PI/2+seconds*Math.PI/30;
	drawHand(line,style,angle,circle);
	
	style.lineWidth=2;
	line.margins=MINUTE_MARGINS;
	angle=-Math.PI/2+mins*Math.PI/30+seconds*Math.PI/1800;
	drawHand(line,style,angle,circle);

	style.lineWidth=3;
	line.margins=HOUR_MARGINS;

	hours=hours>=12 ? hours%12 : hours;
	angle=-Math.PI/2+hours*Math.PI/6+mins*Math.PI/300;
	drawHand(line,style,angle,circle);
	
}

function drawClock(){
	//清除canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.save();
	style.lineWidth=5;
	//style.color="black";
	drawCircle(circle,style);

	// gradient=ctx.createRadialGradient(circle.x,circle.y, canvas.width/1200, circle.x, circle.y, circle.r);
	// gradient.addColorStop(0,"white");
	// gradient.addColorStop(0.5,"rgba(255,255,122,0.5)");
	// gradient.addColorStop(1,"rgba(255,0,0,0.5)");
	// style.color=gradient;
	// style.isFill=true;
	// drawCircle(circle,style);
	ctx.restore();


	ctx.save();
	style.lineWidth=1;
	circle.r=5;
	style.color="black";
	style.isFill=true;
	drawCircle(circle,style);
	ctx.restore();


	ctx.save();
	style.isFill=false;
	circle.r=canvas.width/4;
	style.color="black";
	drawNumerals(circle,style);
	ctx.restore();

	ctx.save();
	drawHands();
	ctx.restore();
}
drawClock();
// id=setInterval(drawClock,1000);

