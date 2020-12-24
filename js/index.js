// UPDATE THIS WITH THE NEW ASSET URL
const modelURL = "https://cdn.glitch.com/2aca3e8a-a925-40bc-abfd-187dab397c84%2Foceanvan.glb?1520222891803"


var dragDrop = require('drag-drop')

const THREE = window.THREE = require('three')
require('./OrbitControls')
require('./GLTFLoader')
require('./RGBELoader.js')
require('./HDRCubeTextureLoader.js')
require('./PMREMGenerator.js')
require('./PMREMCubeUVPacker.js')
require('./GLTFExporter')
require('./EffectComposer')
require('./RenderPass')
require('./ShaderPass')
require('./OutlinePass')
require('./FXAAShader')
require('./CopyShader')

require('./fb')

const hittest = require('threejs-hittest')
const W = window.innerWidth
const H = window.innerHeight

const scene = new THREE.Scene
const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true})
renderer.gammaInput = true
renderer.gammaOutput = true
renderer.setSize(W, H)
const camera = new THREE.PerspectiveCamera(75, W/H, 0.01, 100)
scene.add(camera)
camera.position.set(0,0,10)
camera.lookAt(new THREE.Vector3)

scene.add(new THREE.AmbientLight(0x4f4f4f))
const pointLight = new THREE.PointLight(0xf3f3f3)
pointLight.position.set(10, 10, 10)
scene.add(pointLight)

document.body.appendChild(renderer.domElement)

new THREE.OrbitControls(camera)

const composer = new THREE.EffectComposer(renderer)
const renderPass = new THREE.RenderPass(scene, camera)
composer.addPass(renderPass)

const outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
composer.addPass(outlinePass)

const texLoader = new THREE.TextureLoader()
const texUrl = 'https://cdn.glitch.com/a569fc44-8fbc-470d-b3f5-e5e7874d1859%2Ftri_pattern.jpg?1520020504610'
texLoader.load(texUrl, function(texture) {
  outlinePass.patternTexture = texture
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
})

const effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
effectFXAA.renderToScreen = true;
composer.addPass( effectFXAA );

function render() {
  requestAnimationFrame(render)
  // renderer.render(scene, camera)
  composer.render()
}
requestAnimationFrame(render)

new THREE.GLTFLoader().load(modelURL, (gltf) => {
  scene.add(gltf.scene)
  
  var genCubeUrls = function( prefix, postfix ) {
    return [
      prefix + 'px' + postfix, prefix + 'nx' + postfix,
      prefix + 'py' + postfix, prefix + 'ny' + postfix,
      prefix + 'pz' + postfix, prefix + 'nz' + postfix
    ];
  };
  const prefix ='https://cdn.glitch.com/b30351ef-88cb-4ba4-809a-705437c0cd2b%2F'
  const postfix = '.hdr?1519945182639'
  var hdrUrls = genCubeUrls( prefix, postfix );
  new THREE.HDRCubeTextureLoader().load( THREE.UnsignedByteType, hdrUrls, function ( hdrCubeMap ) {

    var pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap );
    pmremGenerator.update( renderer );

    var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
    pmremCubeUVPacker.update( renderer );

    const hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
    gltf.scene.traverse(m => {
      if (m.material) {
        m.material.envMap = hdrCubeRenderTarget.texture
        m.material.envMapIntensity = 2.0
        m.material.needsUpdate = true
      }
    })
  });
})

function nearestPow2( aSize ){
  return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) ); 
}

dragDrop('canvas', {
  onDrop: function (files, pos) {

    outlinePass.selectedObjects = []
    console.log('Here are the dropped files', files)
    let x = pos.x / window.innerWidth * 2 - 1
    let y = pos.y / window.innerHeight * 2 - 1
    let results = hittest(x, y, camera, scene.children, true)
    let objects = results.filter(r => r.object.material && r.object.material.name.indexOf('DROPTEX') != -1)
    objects = objects || []
    objects = objects.map(o => o.object)
    let dropObject = objects[0]
    if (dropObject && dropObject.material) {
      console.log(dropObject)
      let file = files[0]
      let reader = new FileReader
      reader.onload = () => {
        let dataURI = reader.result
        let img = new Image()
        img.src = dataURI
        img.onload = function() {
          dropObject.material.map = imageToPowerOfTwoTexture(img)  
        }
        
      }
      reader.readAsDataURL(file)
      
      
    }
  },
  onDragEnter: function () {},
  onDragOver: function (e) {
    let x = e.clientX / window.innerWidth * 2 - 1
    let y = e.clientY / window.innerHeight * 2 - 1
    let results = hittest(x, y, camera, scene.children, true)
    let objects = results.filter(r => r.object.material && r.object.material.name.indexOf('DROPTEX') != -1)
    objects = objects || []
    objects = objects.map(o => o.object)
    outlinePass.selectedObjects = objects
  },
  onDragLeave: function () {
    outlinePass.selectedObjects = []
  }
})

function imageToPowerOfTwoTexture(img) {
  if (img.width != nearestPow2(img.width) || img.height != nearestPow2(img.height)) {
    const canvas = document.createElement('canvas')
    canvas.width = Math.min(1024, nearestPow2(img.width))
    canvas.height = Math.min(1024, nearestPow2(img.height))
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
    img = canvas
  }
  const tex = new THREE.Texture(img)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.flipY = false
  tex.needsUpdate = true
  return tex
}

document.querySelector('#download').addEventListener('click', () => {
  var gltfExporter = new THREE.GLTFExporter();
  var options = {
    onlyVisible: true,
    binary: true
  };
  gltfExporter.parse( scene, function( result ) {

    if ( result instanceof ArrayBuffer ) {

      saveArrayBuffer( result, 'scene.glb' );

    } else {

      var output = JSON.stringify( result, null, 2 );
      console.log( output );
      saveString( output, 'scene.gltf' );

    }

  }, options );
  
  var link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link ); // Firefox workaround, see #6594

			function save( blob, filename ) {

				link.href = URL.createObjectURL( blob );
				link.download = filename;
				link.click();

				// URL.revokeObjectURL( url ); breaks Firefox...

			}

			function saveString( text, filename ) {

				save( new Blob( [ text ], { type: 'text/plain' } ), filename );

			}


			function saveArrayBuffer( buffer, filename ) {

				save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

			}
})