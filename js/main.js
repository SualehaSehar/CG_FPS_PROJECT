
var FPS = 60;
var d = new Date();
initial_time = d.getSeconds();
var final_time;
var frame_count = 0;
var delta = 0;
var fps= 0;
var  fno = 1;
let sprite_tile = 0;
let accu = 0;
let fontt, texture_bg,textGeo4,textMesh, textMesh2,textGeo3, textGeo, textref, textGeo2, materials, texture_sprite;
let clock = new THREE.Clock();

//creating a scene
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, //near clipping plane
    1000 //far clipping plane
)

//set camera position on z axis
camera.position.z = 5;

//instance of renderer, to allocate space on webpage to do our 3d stuff
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");

//set the size of space, here using windows inner width and height properties to take full page.
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//now to inject that space on to the page
document.body.appendChild(renderer.domElement);

//make window responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

//text loading 
materials = [
    new THREE.MeshPhongMaterial({ color: 'black' }), // front
];

// background sound

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();

document.addEventListener("click", function(){
    audioLoader.load( 'sounds/nature_sketch.wav', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 1 );   
        //const audioCtx = new AudioContext();
        //audioCtx.resume();
        sound.play();  
    });
}, false); // had to add event listener because of browser error 

function loadFont() {

    const loader = new THREE.FontLoader();
    loader.load('font/Beyond_Wonderland_Regular.json', function (response) {

        fontt = response;

    });
    
}

function createText() {
    textGeo = new THREE.TextGeometry(
       'Sualeha Sehar: B19102132'
        + '\nTooba Tasleem: B21110004009'
        + '\nShifa Altaf: B21110004006'
        + '\nZoya Urooj: B21110004010'
        + '\nTooba Najeeb: B21110004008'
        + '\nMaham Saleem: B21110004002',
        {
            font: fontt,
            size: 0.2,
            height: 1
        });

    textMesh = new THREE.Mesh(textGeo, materials);
    textMesh.position.x = -1.5;
    textMesh.position.y = 2.5;

    scene.add(textMesh);

}



function frame1() {
    
    loadFont();

    //adding bg
    texture_bg = new THREE.TextureLoader().load("images/scene3.jpg", () => {
        scene.background = texture_bg;
    });

    texture_sprite = new THREE.TextureLoader().load('images/WalkingGirl2.png');
    texture_sprite.magFilter = THREE.NearestFilter;
    texture_sprite.repeat.set(1 / 4, 1);
    let mat = new THREE.SpriteMaterial({ map: texture_sprite });
    let sprite = new THREE.Sprite(mat);
    sprite.scale.set(1, 5, 1);
    sprite.position.set(-6,-2,0);
    scene.add(sprite);

    setTimeout(createText, 500);

    setInterval(() => {sprite.position.x += 0.2}, 500); //actually moving character on x axis

}

function refreshText() {
    textGeo2 = new THREE.TextGeometry(
        'FPS : ' + fps,
        {
            font: fontt,
            size: 0.2,
            height: 1
        });

    textMesh2 = new THREE.Mesh(textGeo2, materials);
    textMesh2.name = "fps";
    textMesh2.position.x = 4.5;
    textMesh2.position.y = 2.5;

    //scene.add( textMesh2 );

    //setTimeout('', 1000);

    scene.remove(scene.getObjectByName("fps"));

    setTimeout('', 5000);

    scene.add(textMesh2);

}

function showframeNo(){
    textGeo3 = new THREE.TextGeometry(
        'Frame no: ' + fno ,
        {
            font: fontt,
            size: 0.2,
            height: 1
        });

    textMesh3 = new THREE.Mesh(textGeo3, materials);
    textMesh3.position.x = -6;
    textMesh3.position.y = 2.5;

    setTimeout('', 5000);
    scene.add(textMesh3);

}

function showFPS(){
    var d2 = new Date();
    frame_count++;
    final_time = d2.getSeconds();
    delta = final_time - initial_time;
    if (delta > 0) {
        fps = frame_count / delta;
        console.log("FPS : "+fps);
        frame_count = 0;
        initial_time = final_time

        refreshText();

    }

}



var render = function () {
    //requestAnimationFrame(render); //to create a loop to render ui repeatedly after page is refreshed

    accu += clock.getDelta(); //getDelta --> Get the seconds passed since the clock started and sets oldTime to the current time.
    if (accu > 0.3) {
        sprite_tile++;
        if (sprite_tile > 3) {
            sprite_tile = 0;
        }
        texture_sprite.offset.x = (sprite_tile / 4);
        accu = 0;
    }
    renderer.render(scene, camera);
    
    showFPS();

}

//render();

// show frame one

let interval1,interval2,interval3;
//debugger;
interval1 = setInterval(render, 1000 / FPS); //1000/25 = 40ms
frame1();
setTimeout(showframeNo, 100);








//-------------------------------------------- frame2 ---------------------------------------

function frame2() {
    //adding bg
    texture_bg = new THREE.TextureLoader().load("images/bg2.jpg", () => {
        scene.background = texture_bg;
    });
    setTimeout(showframeNo, 100);
    setTimeout(showTeacherName, 100);
}
var render2 = function () {
    renderer.render(scene, camera);
    showFPS();
}


function showTeacherName(){
    textGeo4 = new THREE.TextGeometry(
        'Humera Tariq',
        {
            font: fontt,
            size: 0.5,
            height: 2
        });

    textMesh4 = new THREE.Mesh(textGeo4, materials);
    textMesh4.position.x = -2;

    setTimeout('', 5000);
    scene.add(textMesh4);

}

// for changing frame
document.getElementById("btn").addEventListener("click", function(){
    changeFrame(interval1);
    interval2 = setInterval(render2, 1000 / FPS); //1000/25 = 40ms
    frame2();
    var elem = document.getElementById('btn');
    elem.parentNode.removeChild(elem);
}, false);

function changeFrame(interval) {
	clearInterval(interval);
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
    fno++;
    
}







//-------------------------------------------- frame2 ---------------------------------------

function frame3() {
    //adding bg
    texture_bg = new THREE.TextureLoader().load("images/scene2.jpg", () => {
        scene.background = texture_bg;
    });
    setTimeout(showframeNo, 100);
}
var render3 = function () {
    renderer.render(scene, camera);
    showFPS();
}

// for changing frame
document.getElementById("btn2").addEventListener("click", function(){
    changeFrame(interval2);
    interval2 = setInterval(render3, 1000 / FPS); //1000/25 = 40ms
    frame3();
    var elem = document.getElementById('btn2');
    elem.parentNode.removeChild(elem);
}, false);








