const startDrawing = () => { 
    const button = document.querySelector("button#play");
    const ss = document.querySelector("button#ss");
    const ss2 = document.querySelector("button#ss2");
    const video = document.querySelector("video");
    const canvas = document.querySelector("canvas");
    
    button.addEventListener('click', () => video.paused ? video.play() : video.pause());

    if(video.crossOrigin !== "anonymous") {
        video.crossOrigin = "anonymous"
    }

    video.addEventListener("loadedmetadata", function(e){
      console.log("width = "+video.videoWidth+"\nheight = "+video.videoHeight)
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      console.log("so we get "+canvas.width)
    })
    let last = new Date().getTime();
    console.log("TIME = "+last)

    let updateCan = function(){
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

        let data = canvas.toDataURL('image/jpeg');
        let imageMessage = new ROSLIB.Message({
          format : 'jpeg',
          data : data.replace('data:image/jpeg;base64,', '')
        });
        console.log(imageMessage.data)

        
    };

    video.crossorigin ="anonymous"
    // updateCan();
    let timer;
    ss.addEventListener('click', () => timer = setInterval(() => {
      updateCan();
      window.requestAnimationFrame(updateCan);
    }, 1000));
    ss2.addEventListener('click', () => clearInterval(timer))
  };
  

window.addEventListener('load', startDrawing)
