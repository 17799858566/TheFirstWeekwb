//1、获取canvas对象
var canvas = document.getElementById("myCanvas");

//2、获取context对象
var context = canvas.getContext("2d");

//3、绘制文本

drawLine(context,canvas.width/2, 0,canvas.width/2, canvas.height );
drawLine(context,0, canvas.height / 2,canvas.width, canvas.height / 2);


context.font = '48px sans-serif';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText("hello world", canvas.width / 2, canvas.height / 2);
