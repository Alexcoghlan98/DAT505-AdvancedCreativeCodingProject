var renderer, scene, camera, composer, circle, skelet, particle, object, object2, globe, globe2;
var loader, mtlloader, objloader, url;

var sceneIndex;
var currentScene;

window.onload = function() {
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  init();
  //animate();
}

function createMesh(){

}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0); //background colour
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();
  currentScene = 0;

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 40; //this determines how close the camera is to the planet in the centre of the page
  scene.add(camera);

  circle = new THREE.Object3D();
  skelet = new THREE.Object3D();
  particle = new THREE.Object3D();


  scene.add(particle); //this adds the 'stars' to the background

  var geometry = new THREE.IcosahedronGeometry(2, 0);
  var geom = new THREE.IcosahedronGeometry(7, 1); //these three lines determine what the shape of the 'stars' in the background are
  var geom2 = new THREE.IcosahedronGeometry(15, 1);

  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    //shading: THREE.FlatShading
  });

  for (var i = 0; i < 15000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(300 + (Math.random() * 2500));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }



  var ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);

  var lights = []; //the following lines are the different components of the lights (colour, where they point)
  lights[0] = new THREE.DirectionalLight( 0xffffff, 0.5 );
  lights[0].position.set( 1, 0, 0 );
  lights[1] = new THREE.DirectionalLight( 0xffffff, 0.5 );
  lights[1].position.set( 0.75, 1, 0.5 );
  lights[2] = new THREE.DirectionalLight( 0xffffff, 0.5 );
  lights[2].position.set( -0.75, -1, 0.5 );

  scene.add( lights[0] );
  scene.add( lights[1] ); //these lines show how many lights will be pointing at the main object in the middle of the page
  scene.add( lights[2] );

  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sounds/Earth.mp3', function( buffer ) {
  sound.setBuffer( buffer );
  sound.setLoop( true );
  sound.setVolume( 0.5 );
  sound.play();
  });

  addEarth();
  addLava();

};


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addEarth(){ //this is where the object and the material from maya is loaded and then shown on the page
  //object = new
  var materialLoader = new THREE.MTLLoader()
  materialLoader.load('assets/Earth.mtl', function (material) {
    var objloader = new THREE.OBJLoader()
    objloader.setMaterials(material)
    console.log('material', material)
    objloader.load(
      'assets/Earth.obj',
      function (object) {
        globe = object;
        scene.add(globe);
        object.position.y = 0.5;

      }
    )
  }, undefined, console.error
)
animate();
}

        function addLava(){
          //object2 = new
          var materialLoader = new THREE.MTLLoader()
          materialLoader.load('assets/Planets/Lava.mtl', function (material) {
            var objloader = new THREE.OBJLoader()
            objloader.setMaterials(material)
            console.log('material', material)
            objloader.load(
              'assets/Planets/Lava.obj',
              function (object2) {
                globe2 = object2;
                scene.add(globe2);
                object2.position.y = 0.5;

      }
    )
  }, undefined, console.error
)
animate();
}

// Code for changing mesh visibility on mousedown event
function onDocumentMouseDown( event ){
  switch (currentScene) {
    case 0:
      currentScene = 1;
      globe.visible = false;
      //console.log("False");
      console.log(globe.rotation.y)
      break;

    case 1:
      currentScene = 0;
      globe.visible = true;
      //console.log("True");
      break;

      // case 2:
      //   currentScene = 0;
      //   globe2.visible = true;
      //   //console.log("True");
      //   break;

  };
}



function animate() {
  requestAnimationFrame(animate);
//this is all of the rotations that are happening on the screen 
  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0020;
  circle.rotation.x -= 0.0020;
  circle.rotation.y -= 0.0030;
  skelet.rotation.x -= 0.0010;
  skelet.rotation.y += 0.0010;
  globe.rotation.y += 0.0040;
  //globe2.rotation.y += 0.0060;
  //group.rotation.y += 0.0020;

  renderer.clear();

  renderer.render( scene, camera )
};
