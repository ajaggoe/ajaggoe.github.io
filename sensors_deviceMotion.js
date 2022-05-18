function displayError(msg) {
    document.getElementById("error").innerHTML += msg + "<br>";
}


function getOrientation(compas){
    let x = Math.ceil(compas);
    if(x < 45 || x >= 315){
        return "N";
    } 
    else if( x < 135){
        return "E";
    }
    else if( x < 225){
        return "S";
    }
    else{
        return "W";
    }

}

function requestPermission() {
    if ( typeof( DeviceOrientationEvent ) !== 'undefined' &&
         typeof( DeviceOrientationEvent.requestPermission ) === 'function' ) {
      DeviceMotionEvent.requestPermission().then((reponse) => {
        if (reponse === 'granted') {
          return true;
        }
      }).catch(console.log);
    } else {
      console.log('DeviceOrientation not supported!');
      return false;
    }
  }

if(requestPermission()){
    // if(window.DeviceOrientationEvent){
        window.addEventListener('deviceorientation', function(compas) {
          console.log(compas.alpha + ' : ' + compas.beta + ' : ' + compas.gamma);
          this.document.getElementById("gyro").innerHTML = `Magnetic Declination: X-Orientation: ${getOrientation(compas.alpha)} <br> Y = ${Math.ceil(compas.beta)} <br> Z = ${Math.ceil(compas.gamma)}`
          });
}
else{
    console.error("idk bro why you no work")
}
var ish = document.createElement("input")
ish.type = "number"
ish.value = 2
console.log(parseInt(ish.value))

let iOS = !window.MSStream && /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)
console.log(iOS ? "blyat yes" : "blyat no")
console.log(`number of touch is ${navigator.maxTouchPoints}`)
console.log(typeof DeviceMotionEvent.requestPermission === 'function')
this.document.getElementById("device-info").innerHTML = ` and blyat ${navigator.maxTouchPoints}`
if(iOS){
  this.document.getElementById("device-info").innerHTML += `<br>This is an iOS device, specifically: ${navigator.userAgent}`
  
  let permbutton = this.document.createElement("button")
  permbutton.setAttribute('id', 'perm');
  permbutton.innerHTML = "requestPermission"

  permbutton.addEventListener('click', () => {
  this.document.getElementById("device-info").innerHTML += `<br>BUTTON SHOULD WORK`
    if(typeof(DeviceOrientationEvent.requestPermission) === "function"){
      this.document.getElementById("device-info").innerHTML += `<br>AND REQUEST PERMISSION`
      DeviceOrientationEvent.requestPermission().then((reponse) => {
        if (reponse === 'granted') {
          return true;
        }
      })
    }
  });
  
  this.document.body.appendChild(permbutton);
} else {
  this.document.getElementById("device-info").innerHTML = `This is an not an iOS device, specifically: ${navigator.userAgent}`
  if(window.DeviceMotionEvent){
    window.addEventListener('devicemotion', function(event) {
        console.log(event.acceleration.x + ' m/s2');
        if(event.acceleration.x){
          this.document.getElementById("acc-info").innerHTML = `x: ${event.acceleration.x.toFixed(2)} <br>y: ${event.acceleration.y.toFixed(2)}`
          this.document.getElementById("gyro").style.left = event.x * 3 + 20
        }
    });
  } 
}


/**
 * FLASHLIGHT
 */
//have a console on mobile
// const consoleOutput = document.getElementById("console");
// const log = function (msg) {
//   consoleOutput.innerText = `${consoleOutput.innerText}\n${msg}`;
//   console.log(msg);
// }

// //Test browser support
// const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

// if (SUPPORTS_MEDIA_DEVICES) {
//   //Get the environment camera (usually the second one)
//   navigator.mediaDevices.enumerateDevices().then(devices => {

//     const cameras = devices.filter((device) => device.kind === 'videoinput');

//     if (cameras.length === 0) {
//       log('No camera found on this device.');
//     }
//     // Create stream and get video track
//     navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: 'environment',
//       }
//     }).then(stream => {
//       const track = stream.getVideoTracks()[0];

//       //Create image capture object and get camera capabilities
//       const imageCapture = new ImageCapture(track)
//       imageCapture.getPhotoCapabilities().then(capabilities => {
//         //let there be light!
//         const btn = document.querySelector('.switch');
//         const torchSupported = !!capabilities.torch || (
//           'fillLightMode' in capabilities &&
//           capabilities.fillLightMode.length != 0 &&
//           capabilities.fillLightMode != 'none'
//         );

//         if (torchSupported) {
//           let torch = false;
//           btn.addEventListener('click', function (e) {
//             try {
//               track.applyConstraints({
//                 advanced: [{
//                   torch: (torch = !torch)
//                 }]
//               });
//             } catch (err) {
//               log(err);
//             }
//           });
//         } else {
//           log("No torch found");
//         }
//       }).catch(log);
//     }).catch(log);
//   }).catch(log);

//   //The light will be on as long the track exists
// }