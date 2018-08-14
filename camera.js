'use strict';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const os = require('os');
const path = require('path');
const port = 8888;

const av = require('tessel-av');
const camera = new av.Camera();

var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['B']);

var servo1 = 2; // We have a servo plugged in at position 1

servo.on('ready', function () {
  var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

  //  Set the minimum and maximum duty cycle for servo 1.
  //  If the servo doesn't move to its full extent or stalls out
  //  and gets hot, try tuning these values (0.05 and 0.12).
  //  Moving them towards each other = less movement range
  //  Moving them apart = more range, more likely to stall and burn out
  servo.configure(servo1, 0.05, 0.12, function () {
    setInterval(function () {
      console.log('Position (in range 0-1):', position);
      //  Set servo #1 to position pos.
      servo.move(servo1, position);

      // Increment by 10% (~18 deg for a normal servo)
      position += 0.1;
      if (position > 1) {
        position = 0; // Reset servo position
      }
      //position -= 0.1
    }, 1000); // Every 500 milliseconds
  });
});

//++++++++++++++++++


// server.listen(port, function () {
//   console.log(`http://${os.hostname()}.local:${port}`);
// });

// app.use(express.static(path.join(__dirname, '/public')));
// app.get('/stream', (request, response) => {
//   response.redirect(camera.url);
//   console.log(camera.url)
// });

// ==========================


// var av = require('tessel-av');
// var os = require('os');
// var http = require('http');
// var port = 8000;
// var camera = new av.Camera();


// http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'image/jpg' });
    
//   camera.capture().pipe(response);

// }).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));