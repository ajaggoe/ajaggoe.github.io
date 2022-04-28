function displayError(msg) {
    document.getElementById("error").innerHTML += msg + "<br>";
}

function getOrientation(compas){
    switch(Math.ceil(compas)){
        case x < 45 || x >= 315: 
            return "N";
        case x < 135:
            return "E";
        case x < 225:
            return "S";
        case x < 315:
            return "W";

    }
}
window.addEventListener('deviceorientation', function(compas) {
    console.log(compas.alpha + ' : ' + compas.beta + ' : ' + compas.gamma);
    this.document.getElementById("gyro").innerHTML = `Magnetic Declination: X-Orientation: ${getOrientation(compas.alpha)} <br> Y = ${Math.ceil(compas.beta)} <br> Z = ${Math.ceil(compas.gamma)}`
  });

window.addEventListener('devicemotion', function(event) {
    console.log(event.acceleration.x + ' m/s2');
    this.document.getElementById("acc-info").innerHTML = `x: ${event.acceleration.x.toFixed(2)} <br>y: ${event.acceleration.y.toFixed(2)}`
});