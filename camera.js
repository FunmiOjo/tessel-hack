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
  servo.configure(servo1, 0.05, 0.12, function() {
    servo.move(servo1, 0.5);
  }); // Every 500 milliseconds
});

//++++++++++++++++++


// server.listen(port, function () {
//   console.log(`http://${os.hostname()}.local:${port}`);
// });

// app.use(express.static(path.join(__dirname, '/public')));
  app.get('/stream', (request, response) => {
    response.redirect(camera.url);
    console.log(camera.url)
  });

  app.get('/servo/:direction', function(req, res, next) {
    if (req.params.direction === 'left') {
      position = 0.1;
    } else if (req.params.direction === 'right'){
      position = 0.9
    }

    if (position > 1 || direction === 'center') {
      position = 0.5; // Reset servo position
    }
    next()
  })


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
