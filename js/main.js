let images = [
    "../image/05.png",
    "../image/013.png",
    "../image/014.png",
    "../image/015.png",
    "../image/016.png",
    "../image/017.png",
    "../image/018.png",
    "../image/019.png",
    "../image/020.png",
    "../image/021.png",
    "../image/022.png",
    "../image/023.png",
    "../image/024.png",
];

let posters = [
    "../image/poster1_h.png",
    "../image/poster2_h.png",
    "../image/poster3_h.png",
    "../image/poster4_h.png",
]
let index = 0;
let index2 = 0;

function updateImage(){
    document.getElementById("ver-img").src = images[index];
    index=(index+1)%images.length;
}
setInterval(updateImage, 2500);

function updatePoster(){
    document.getElementById("ho-img").src = posters[index2];
    index2=(index2+1)%posters.length;

}
setInterval(updatePoster, 2500);
