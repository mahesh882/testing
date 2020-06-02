'use strict';
const { desktopCapturer, remote } = require('electron');

const { writeFile } = require('fs');

const { dialog, Menu } = remote;

const fs = require('fs')

const electronScreen = desktopCapturer.screen;

var cron = require('node-cron');
var util = require('util');
const ioHook = require('iohook');

// Global state
let mediaRecorder;
const recordedChunks = [];

// Buttons
const videoElement = document.querySelector('video');

const startBtn = document.getElementById('startBtn');
var status = false;
startBtn.onclick = e => {
  startBtn.classList.add('is-danger');
  startBtn.innerText = 'Recording';
  status = true;
};

const stopBtn = document.getElementById('stopBtn');

stopBtn.onclick = e => {
  startBtn.classList.remove('is-danger');
  startBtn.innerText = 'Start';
  status = false;
};

const videoSelectBtn = document.getElementById('videoSelectBtn');
var keyCount = 0;
var clickCount = 0;
cron.schedule('*/10 * * * *', () => {
  getVideoSources();
});

function determineScreenshot() {
  return {
    width: 1400,
    height: 800
  };
}
ioHook.on("keydown", event => {
  keyCount = keyCount + 1;
});
ioHook.on("mousemove", event => {
  clickCount = event.clicks;
});
ioHook.start();
// Get the available video sources
async function getVideoSources() {
  const thumbSize = determineScreenshot();
  let options = { types: ['screen'], thumbnailSize: thumbSize };
  const inputSources = await desktopCapturer.getSources(options);
  inputSources.map(source => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let name = year + "_" + month + "_" + date + "_" + hours + "_" + minutes + "_" + seconds;
    if (!fs.existsSync('images/' + year + "_" + month + "_" + date)) {
      fs.mkdirSync('images/' + year + "_" + month + "_" + date);
    }
    fs.writeFile('images/' + year + "_" + month + "_" + date + '/' + name + '.png', source.thumbnail.toPNG(1.0), function (err) {
      if (err) return console.log(err.message);
    });
    var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'a' });
    var log_stdout = process.stdout;
    var fileName = 'images/' + year + "_" + month + "_" + date + '/' + name + '.png';
    console.log = function (fileName) { //
      log_file.write(fileName + '\n');
      log_stdout.write(fileName + '\n');
    };
    var log_details = {};
    log_details = { 'Screen Shot Path': fileName, 'Total Keyboard Event': keyCount, 'Total Mouse Event': clickCount };
    console.log(JSON.stringify(log_details));
    keyCount = 0;
    clickCount = 0;
    ioHook.stop();
    ioHook.start();
  })
}