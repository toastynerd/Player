var PlayerUtils = function(el) {
  this.el = el;
  this.videoEl = this.el.querySelector('.video-frame');
  this.duration = this.el.querySelector('.duration');
  this.seekBar = this.el.querySelector('.seek-bar');
  this.playButton = this.el.querySelector('.play-pause');
  this.current = this.el.querySelector('.current');
  this.muteButton = this.el.querySelector('.mute');
  this.fullScreenButton = this.el.querySelector('.full-screen');
  this.volumeBar = this.el.querySelector('.volume-bar');
  this.audioControls = new AudioControls(this.el);
  this.video = new Video(this.videoEl);

  // setup listeners
  this.videoEl.ondurationchange = function() {
    this.setDuration(); 
  }.bind(this);

  this.playButton.addEventListener('click', function() {
    this.togglePlay();
  }.bind(this));

  this.videoEl.addEventListener('click', function() {
    this.togglePlay(); 
  }.bind(this));

  this.muteButton.addEventListener('click', function() {
    this.audioControls.toggleMute();
  }.bind(this));

  this.fullScreenButton.addEventListener('click', function() {
    this.video.initFullScreen();
  }.bind(this));

  this.seekBar.addEventListener('change', function() {
    this.setPlayerCurrentTime();
  }.bind(this));

  this.videoEl.addEventListener('timeupdate', function() {
    this.setPlayerSeekBarPosition();
    this.setPlayerCurrentTimestamp();
  }.bind(this));

  this.seekBar.addEventListener('mousedown', function() {
    this.pause();
  }.bind(this));

  this.seekBar.addEventListener('mouseup', function() {
    this.play();
  }.bind(this));

  this.volumeBar.addEventListener('change', function() {
    this.audioControls.setVolume();
  }.bind(this));
};

PlayerUtils.prototype.pause = function() {
  this.videoEl.pause();
};

PlayerUtils.prototype.play = function() {
  this.videoEl.play();
};

PlayerUtils.prototype.generateTimestamp = function(timestamp) {
  var totalSec = timestamp,
      hours = parseInt(totalSec / 3600) % 24,
      minutes = parseInt(totalSec / 60) % 60,
      seconds = Math.ceil(totalSec % 60),
      result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

      if (hours > 0) {
        result = (hours < 10 ? "0" + hours : hours) + ":" + result;
      }

  return result;
};

PlayerUtils.prototype.setDuration = function() {
  //here's some more storage repitition that should be removed
  this.duration.innerHTML = this.generateTimestamp(this.videoEl.duration || 0);
};

PlayerUtils.prototype.setPlayerCurrentTime = function() {
  this.videoEl.currentTime = (this.videoEl.duration || 0) * (this.seekBar.value / 100);
};

PlayerUtils.prototype.setPlayerCurrentTimestamp = function() {
  this.current.innerHTML = this.generateTimestamp(this.videoEl.currentTime);
};

PlayerUtils.prototype.setPlayerSeekBarPosition = function() {
  this.seekBar.value = (100 / this.videoEl.duration) * this.videoEl.currentTime;
};

PlayerUtils.prototype.togglePlay = function() {
  if (this.videoEl.paused === true) {
    this.play();
    this.playButton.innerHTML = '<img src="images/pause.gif">';
  } else {
    this.pause();
    this.playButton.innerHTML = '<img src="images/play.gif">';
  }
};
