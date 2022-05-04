const startDrawing = () => { 
    const button = document.querySelector("button#play");
    const ss = document.querySelector("button#ss");
    const video = document.querySelector("video");
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const fpsInfo = document.querySelector("#fps-info");
    const metadataInfo =  document.querySelector("#metadata-info");
    
    button.addEventListener('click', () => video.paused ? video.play() : video.pause());
  
    video.addEventListener('play', () => {
      if (!('requestVideoFrameCallback' in HTMLVideoElement.prototype)) {
        return alert('Your browser does not support the `Video.requestVideoFrameCallback()` API.');
      }    
    });
    
    let width = canvas.width;
    let height = canvas.height;
    
    let paintCount = 0;
    let startTime = 0.0;
  
    // const updateCanvas = (now, metadata) => {
    //   if (startTime === 0.0) {
    //     startTime = now;
    //   }
  
    //   ctx.drawImage(video, 0, 0, width, height);
  
    //   const elapsed = (now - startTime) / 1000.0;
    //   const fps = (++paintCount / elapsed).toFixed(3);
    //   fpsInfo.innerText = !isFinite(fps) ? 0 : fps;
    //   metadataInfo.innerText = JSON.stringify(metadata, null, 2);
  
    //   video.requestVideoFrameCallback(updateCanvas);
    // };  
    let screenshot = function () {
        console.log("bla")
        ctx.drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/jpeg');
        var imageMessage = new ROSLIB.Message({
            format : 'jpeg',
            data : data.replace('data:image/jpeg;base64,', '')
        });
        console.log(imageMessage);
    }
    video.src =
    "https://cdn.glitch.com/c162fc32-0a96-4954-83c2-90d4cdb149fc%2FBig_Buck_Bunny_360_10s_20MB.mp4?v=1587545460302";
    // video.requestVideoFrameCallback(updateCanvas);
  

    ss.addEventListener('click', () => screenshot);
    // setInterval(screenshot, 250);  
  };
  
//   setInterval(function() {
//     window.addEventListener('load', startDrawing)
// }, 250);
window.addEventListener('load', startDrawing)
