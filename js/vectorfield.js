let particles = []
var pix = 10
var sampling = 200 //數字越大採樣越細
let canvas;
let engine;
let fontSize = 100;
let fontColor = 'yellow';


function preload(){
	engine = loadFont('../fonts/NanumSquareNeo-eHv.ttf')
}


function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}
	

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.background(0)
	textFont(engine);
	textSize(fontSize);
	colorMode(HSB)
	for(var i=0; i<width; i+=pix){	
		for(var j=0; j<height; j+=pix){
			particles.push({
				x:i, y:j, clr: color(noise(i/50, j/50)*380, 80, 90)
			})
		}
	}
}

function draw() {
	fill('yellow');
	text('히토 슈타이얼', 490, 200);
	text('Too Much World', 330,400);
	text('2023.01.26', 200, 600);
	text('- 2023.03.31', 600,690)
	background(0, 0.01)
	noStroke()

	for(var i=0;i<particles.length;i++){
		let p = particles[i]
		fill(p.clr)
		ellipse(p.x, p.y, 3)		 
		
		p.x += (noise(p.x/sampling, p.y/sampling, 1000)-0.5)*8//noise = 0~1之間
		p.y += (noise(p.x/sampling, p.y/sampling, 10000)-0.5)*8
	}
}
