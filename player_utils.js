;(function(bindTo) {
  var PlayerUtils = function(el) {
    this.el = el;
    this.duration = this.el.querySelector('.duration');
    this.seekBar = this.el.querySelector('.seek-bar');
    this.playButton = this.el.querySelector('play-pause');
    this.audioControls = new bindTo.AudioControls(el);
    this.video = new bindTo.Video(el);
  };

  PlayerUtils.prototype.pause = function() {
    this.el.pause();
  };

  PlayerUtils.prototype.play = function() {
    this.el.play();
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
    this.duration.innerHTML = this.generateTimestamp(this.el.duration);
  };

  PlayerUtils.prototype.setPlayerCurrentTime = function() {
    this.el.currentTime = this.el.duration * (this.seekBar.value / 100);
  };

  PlayerUtils.prototype.setPlayerCurrentTimestamp = function() {
    this.current.innerHTML = this.generateTimestamp(this.el.currentTime);
  };

  PlayerUtils.prototype.setPlayerSeekBarPosition = function() {
    this.seekBar.value = (100 / this.el.duration) * this.el.currentTime;
  };

  PlayerUtils.prototype.togglePlay = function() {
    if (this.el.paused === true) {
      this.play();
      this.playButton.innerHTML = '<img src="images/pause.gif">';
    } else {
      this.pause();
      this.playButton.innerHTML = '<img src="images/play.gif">';
    }
  }

  bindTo.PlayerUtils = PlayerUtils;
})(window);
