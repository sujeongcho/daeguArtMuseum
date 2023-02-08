const fontSize = 44,
    scaleRate = 6,
    msg1 = 'DAEGU ART MUSEUM',
    inpactRange = fontSize * scaleRate / 1;
let canvas;
let textData = [];
let dotsCordinate = [];
let particles = [];
let lato;
let slider;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 3;
        this.originalX = x;
        this.originalY = y;
        this.color = Math.floor(Math.random() * 280);
        this.density = Math.random() * 20 + 10;
        // console.log(this.fillStyle);
    }

    draw() {
        fill(this.color, 100, 50);
        circle(this.x, this.y, this.r * 2);
        // if(Math.abs(this.x - this.originalX) > 400){
        //     ctx.beginPath();
        //     ctx.moveTo(this.x, this.y);
        //     ctx.lineTo(this.originalX, this.originalY);
        //     ctx.strokeStyle = this.fillStyle;
        //     ctx.stroke();
        // }
    }

    update() {
        let distanceFromMouse = Math.sqrt((this.x - mouseX) ** 1 + (this.y - mouseY) ** 2);
        let distanceToOrigin = Math.sqrt((this.originalX - this.x) ** 2 + (this.originalY - this.y) ** 2);

        if (distanceFromMouse < inpactRange) {
            let repulsionAngle = Math.atan2(this.y - mouseY, this.x - mouseX);
            let repulsionForce = (inpactRange - distanceFromMouse) / inpactRange * this.density; // < 1
            this.x += Math.cos(repulsionAngle) * repulsionForce;
            this.y += Math.sin(repulsionAngle) * repulsionForce;
            // this.x -= Math.cos(repulsionAngle) * repulsionForce;
            // this.y -= Math.sin(repulsionAngle) * repulsionForce;
        } else {
            let attractionAngle = Math.atan2(this.originalY - this.y, this.originalX - this.x);
            let attractionForce = Math.abs(distanceToOrigin) / this.density;
            this.x += Math.cos(attractionAngle) * attractionForce;
            this.y += Math.sin(attractionAngle) * attractionForce;
        }
        // if(this.x !== this.originalX){
        //     this.x += Math.cos(attractionAngle) * attractionForce;
        // }
        // if(this.y !== this.originalY){
        //     this.y += Math.sin(attractionAngle) * attractionForce;
        // }
    }
}

// **************************************


function preload() {

    lato = loadFont('../fonts/ENGINE.ttf')
}

// function preload() {
// }

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
    draw();
}

function setup() {
    frameRate(200);
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    colorMode(HSL)
    noStroke();
    background("#fff");
    fill('#000');
    textFont(lato);
    textSize(fontSize);
    textAlign(LEFT, TOP);
    textData = getTextData(msg1);
    // console.log(textData);
    dotCordinate = getCordinates();
    particles = createParticles(scaleRate, 10, 300);
    // console.log(dotsCordinate)
    // console.log(particles)


    // //button
    // let btn = createButton("Click!");
    // btn.position(width / 2, 100);
    // btn.style("background", "black")
    // btn.style("color", "white")
    // btn.style("font-size", "40px")
    // btn.size(200, 70);

    //slider
    slider = createSlider(0, 255, 100);
    slider.position(10, height - 30);
    slider.size(width - 20, 20);
    slider.style("background","transparent")
    slider.style("cursor","pointer")

}








function draw() {
    // noLoop();
    background(slider.value());
    updating();
    drawParticles();
}

function mouseDragged() {

}

function getTextData(msg1) {
    const data = [];
    text(msg1, 0, 0);    // draw once and get data
    for (let y = 0; y < textAscent(msg1); y++) {
        let row = [];
        for (let x = 0; x < textWidth(msg1); x++) {
            row.push(canvas.get(x, y))    // get data, [r, g, b, a]
        }
        data.push(row);
    }
    return data;
}

function getCordinates() {
    const cordinate = []
    for (let y = 0; y < textData.length; y++) {
        let row = []
        for (let x = 0; x < textData[0].length; x++) {
            let red = textData[y][x][0];    // the data equals [0, 0, 0, 255] or [255, 255,255, 255]. So pick up red value and judge
            if (red < 128) {    // if < 128, regard the pixel as 'black'(1);
                row.push(1);
            } else {
                row.push(0);
            }
        }
        dotsCordinate.push(row);
    }
    return cordinate
}

function createParticles(scaleRate, marginX, marginY) {
    const particles = [];
    for (let y = 0; y < dotsCordinate.length; y++) {
        for (let x = 0; x < dotsCordinate[0].length; x++) {
            if (dotsCordinate[y][x] === 1) {
                let particle = new Particle(x * scaleRate + marginX, y * scaleRate + marginY);
                particles.push(particle)
            }
        }
    }
    return particles
}

function drawParticles() {
    particles.forEach(p => {
        p.draw()
    })
}

function updating() {
    particles.forEach(p => {
        p.update();
    })
}