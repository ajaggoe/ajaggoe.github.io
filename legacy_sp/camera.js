const startDrawing = () => { 
    const button = document.querySelector("button#play");
    const ss = document.querySelector("button#ss");
    const ss2 = document.querySelector("button#ss2");
    const video = document.querySelector("video");
    let canvas = document.createElement("canvas");
    let width = null;
    let height = null
    
    button.addEventListener('click', () => video.paused ? video.play() : video.pause());
   
    if ( typeof( DeviceOrientationEvent ) !== 'undefined' &&
         typeof( DeviceOrientationEvent.requestPermission ) === 'function' ) {
      DeviceMotionEvent.requestPermission().then((reponse) => {
        if (reponse === 'granted') {
          document.getElementById('error').innerHTML = "YAH BISH"
        }
      }).catch(console.log);
    } else {
      console.log('DeviceOrientation not supported!');
    }
    if(video.crossOrigin !== "anonymous") {
        video.crossOrigin = "anonymous"
    }

    video.addEventListener("loadedmetadata", function(e){
      console.log("width = "+video.videoWidth+"\nheight = "+video.videoHeight)
      width = video.videoWidth;
      height = video.videoHeight;
    })

    let updateCan = function(){
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

        let data = canvas.toDataURL('image/jpeg');
        let imageMessage = new ROSLIB.Message({
          format : 'jpeg',
          data : data.replace('data:image/jpeg;base64,', '')
        });
        return imageMessage;

        
    };

    video.crossorigin ="anonymous"
    // updateCan();
    let timer;
    let started = true;
    let i = 0;
    function boop () {
      canvas.width = width;
      canvas.height = height;
      console.log(canvas.width)
      if(started){
        timer = setInterval(() => {
          let imageMessage = updateCan();
          window.requestAnimationFrame(updateCan);
          console.log(imageMessage.data)
          console.log(i++)
        }, 1000);  
        started = false;
        
      }
    }
    ss.addEventListener('click', boop);
    ss2.addEventListener('click', () => {
      clearInterval(timer);
      started = true;
    })
  };
  

window.addEventListener('load', startDrawing)
