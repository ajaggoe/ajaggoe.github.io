function displayError(msg) {
    document.getElementById("error").innerHTML += msg + "<br>";
}

let shakeCnt = 0

function onShake(accelerometer) {
    if (Math.abs(accelerometer.x) < 0.6) return;

    document.getElementById("shake-count").innerHTML = (++shakeCnt);
    document.getElementById("acc-info").innerHTML = `Accelerometer :<br>x: ${accelerometer.x}<br>
    y: ${accelerometer.x}<br>
    z: ${accelerometer.z}`;
}

function onGyro(gyroscope) {

    document.getElementById("gyro").innerHTML = `Gyro:<br>x: ${Math.round(gyroscope.x * 100) / 100}<br>
    y: ${Math.round(gyroscope.y * 100) / 100}<br>
    z: ${Math.round(gyroscope.z * 100) / 100}`;
}

function onLightRead(ambientLightSensor) {
    document.getElementById("light").innerHTML = `lux: $(ambientLightSensor.illuminance}`
}
let accelerometer = null;
let gyroscope = null;
let ambientLightSensor = null;

const sensor = new RelativeOrientationSensor({ frequency: 60, referenceFrame: 'device' });

sensor.addEventListener('reading', () => {
  // model is a Three.js object instantiated elsewhere.
  model.quaternion.fromArray(sensor.quaternion).inverse();

  document.getElementById("light").innerHTML = `x = $(sensor)`

});
sensor.addEventListener('error', error => {
  if (error.name == 'NotReadableError') {
    console.log("Relative Sensor is not available.");
  }
});
sensor.start();

try {
    accelerometer = new Accelerometer({frequency: 10});
    accelerometer.addEventListener('error', event => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            navigator.permissions.query({ name: 'accelerometer' })
                .then(result => {
                  if (result.state === 'denied') {
                    displayError('Permission to use accelerometer sensor is denied.');
                    return;
                  }
                  // Use the sensor.
                });
        } else if (event.error.name === 'NotReadableError' ) {
            displayError('Cannot connect to the Accelerometer.');
        }
    });
    accelerometer.addEventListener('reading', () => onShake(accelerometer));
    accelerometer.start();
} catch (error) {
    // Handle construction errors.
    if (error.name === 'SecurityError') {
        // See the note above about feature policy.
        displayError('Accelerometer Sensor construction was blocked by a feature policy.');
    } else if (error.name === 'ReferenceError') {
        displayError('Accelerometer Sensor is not supported by the User Agent.');
    } else {
        throw error;
    }
}

try {
    gyroscope = new Gyroscope({frequency: 10});
    gyroscope.addEventListener('error', event => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            navigator.permissions.query({ name: 'gyroscope' })
                .then(result => {
                  if (result.state === 'denied') {
                    displayError('Permission to use gyroscope sensor is denied.');
                    return;
                  }
                  // Use the sensor.
                });
        } else if (event.error.name === 'NotReadableError' ) {
            displayError('Cannot connect to the Gyroscope.');
        }
    });
    gyroscope.addEventListener('reading', () => onGyro(gyroscope));
    gyroscope.start();
} catch (error) {
    // Handle construction errors.
    if (error.name === 'SecurityError') {
        // See the note above about feature policy.
        displayError('Gyro Sensor construction was blocked by a feature policy.');
    } else if (error.name === 'ReferenceError') {
        displayError('Gyro Sensor is not supported by the User Agent.');
    } else {
        throw error;
    }
}
try {
    const sensorLight = new AmbientLightSensor();
    sensorLight.onreading = () => document.getElementById("light").innerHTML = `lux: $(ambientLightSensor.illuminance}`;
}
catch(error){
    displayError('blyat'+error);
}
try {
    ambientLightSensor = new AmbientLightSensor({frequency: 60});
    ambientLightSensor.addEventListener('error', event => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            // Branch to code for requesting permission.
        } else if (event.error.name === 'NotReadableError' ) {
            displayError('Cannot connect to the light sensor.');
        }
    });
    ambientLightSensor.addEventListener('reading', () => onLightRead(ambientLightSensor));
    ambientLightSensor.start();
} catch (error) {
    // Handle construction errors.
    if (error.name === 'SecurityError') {
        // See the note above about feature policy.
        displayError('Light Sensor construction was blocked by a feature policy.');
    } else if (error.name === 'ReferenceError') {
        displayError('Light Sensor is not supported by the User Agent.:: '+error);
    } else {
        throw error;
    }
}

console.log(gyroscope);