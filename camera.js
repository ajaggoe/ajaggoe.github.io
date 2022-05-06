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

    
    let width = canvas.width;
    let height = canvas.height;
    console.log(width)

    let startTime = 0.0;

    let updateCan = function(){
        ctx.drawImage(video, 0, 0, width, height);

        let data = canvas.toDataURL('image/jpeg');
        let imageMessage = new ROSLIB.Message({
          format : 'jpeg',
          data : data.replace('data:image/jpeg;base64,', '')
        });
        console.log(imageMessage)
    };
  

    video.crossorigin ="anonymous"
    // updateCan();
    ss.addEventListener('click', () => setInterval(updateCan(), 20));
    
  };
  

window.addEventListener('load', startDrawing)
