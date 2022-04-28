function displayError(msg) {
    document.getElementById("error").innerHTML += msg + "<br>";
}
window.addEventListener('deviceorientation', function(compas) {
    console.log(compas.alpha + ' : ' + compas.beta + ' : ' + compas.gamma);
    this.document.getElementById("gyro").innerHTML = `${compas.alpha} : ${compas.beta} : ${compas.gamma}`
  });

window.addEventListener('devicemotion', function(event) {
    console.log(event.acceleration.x + ' m/s2');
    this.document.getElementById("acc-info").innerHTML = `x: ${event.acceleration.x} <br>y: ${event.acceleration.y}`
});