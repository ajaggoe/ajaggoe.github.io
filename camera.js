const startDrawing = () => { 
    const button = document.querySelector("button#play");
    const ss = document.querySelector("button#ss");
    const video = document.querySelector("video");
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const fpsInfo = document.querySelector("#fps-info");
    const metadataInfo =  document.querySelector("#metadata-info");
    
    button.addEventListener('click', () => video.paused ? video.play() : video.pause());

    if(video.crossOrigin !== "anonymous") {
        video.crossOrigin = "anonymous"
    }
    video.addEventListener('play', () => {
      if (!('requestVideoFrameCallback' in HTMLVideoElement.prototype)) {
        return alert('Your browser does not support the `Video.requestVideoFrameCallback()` API.');
      }    
    });
    
    let width = this.canvas.width;
    let height = this.canvas.height;
    console.log(width)

    let startTime = 0.0;

    var updateCan = function(){
        ctx.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL('image/jpeg');
        var imageMessage = new ROSLIB.Message({
          format : 'jpeg',
          data : data.replace('data:image/jpeg;base64,', '')
        });
        console.log(imageMessage)
    };
    const updateCanvas = (now, metadata) => {
      if (startTime === 0.0) {
        startTime = now;
      }
  
      ctx.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/jpeg');
      var imageMessage = new ROSLIB.Message({
        format : 'jpeg',
        data : data.replace('data:image/jpeg;base64,', '')
      });
      console.log(imageMessage)
    };  

    video.crossorigin ="anonymous"

    updateCan();
    ss.addEventListener('click', () => updateCan());
    
  };
  

window.addEventListener('load', startDrawing)
