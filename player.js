;(function() {
  var el = document.getElementById("videoID"),
      videoEl = el.querySelector(".video-frame"),
      playButton = el.querySelector(".play-pause"),
      muteButton = el.querySelector(".mute"),
      fullScreenButton = el.querySelector(".full-screen"),
      seekBar = el.querySelector(".seek-bar"),
      volumeBar = el.querySelector(".volume-bar"),
      duration = el.querySelector(".duration"),
      current = el.querySelector(".current");

  var playerUtils = new PlayerUtils(el);
  
  videoEl.ondurationchange = function() {
    playerUtils.setDuration();
  };

  playButton.addEventListener("click", function() {
    playerUtils.togglePlay();
  });

  videoEl.addEventListener("click", function() {
    playerUtils.togglePlay();
  });

  muteButton.addEventListener("click", function() {
    playerUtils.audio.toggleMute();
  });

  fullScreenButton.addEventListener("click", function() {
    playerUtils.video.initFullScreen();
  });

  seekBar.addEventListener("change", function() {
    playerUtils.setPlayerCurrentTime();
  });

  videoEl.addEventListener("timeupdate", function() {
    playerUtils.setPlayerSeekBarPosition();
    playerUtils.setPlayerCurrentTimestamp();
  });

  seekBar.addEventListener("mousedown", function() {
    playerUtils.pause();
  });

  seekBar.addEventListener("mouseup", function() {
    playerUtils.play();
  });

  volumeBar.addEventListener("change", function() {
    playerUtils.audio.setVolume();
  });
})();
