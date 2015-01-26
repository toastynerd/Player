;(function(bindTo) {
  var AudioControls = function(el) {
    this.el = el;
    this.muteButton =  this.el.querySelector('.mute');
    this.volumeBar = this.el.querySelector('.volume-bar');
  };

  AudioControls.prototype.mute = function() {
    this.el.muted = true;
    this.el.querySelector('.mute').innerHTML = '<img src="images/mute.gif">';
  };

  AudioControls.prototype.unmute = function() {
    this.el.muted = false;
    this.muteButton.innerHTML = '<img src="images/unmute.gif">';
  };

  AudioControls.prototype.setVolume = function(value) {
    //this probably needs to be refactored, storing the same data in 2 places
    this.el.volume = this.volumeBar; 
  };

  AudioControls.prototype.toggleMute = function() {
    videlEl.muted ? this.unmute() : this.mute();
  };

  //not sold on this yet
  bindTo.AudioControls = AudioControls;
})(window);
