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

  var playerUtils = {
    audio: {
      setMute: function() {
        videoEl.muted = true;
        muteButton.innerHTML = '<img src="images/mute.gif">';
      },
      setUnmute: function() {
        videoEl.muted = false;
        muteButton.innerHTML = '<img src="images/unmute.gif">';
      },
      setVolume: function() {
        videoEl.volume = volumeBar.value;
      },
      toggleMute: function() {
        if (videoEl.muted === false) {
          playerUtils.audio.setMute();
        } else {
          playerUtils.audio.setUnmute();
        }
      }
    },
    pause: function() {
      videoEl.pause();
    },
    play: function() {
      videoEl.play();
    },
    generateTimestamp: function(timestamp) {
      var totalSec = timestamp,
          hours = parseInt(totalSec / 3600) % 24,
          minutes = parseInt(totalSec / 60) % 60,
          seconds = Math.ceil(totalSec % 60),
          result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

          if (hours > 0) {
            result = (hours < 10 ? "0" + hours : hours) + ":" + result;
          }

      return result;
    },
    setDuration: function() {
      duration.innerHTML = playerUtils.generateTimestamp(videoEl.duration);
    },
    setPlayerCurrentTime: function() {
      var time = videoEl.duration * (seekBar.value / 100);
      videoEl.currentTime = time;
    },
    setPlayerCurrentTimestamp: function() {
      current.innerHTML = playerUtils.generateTimestamp(videoEl.currentTime);
    },
    setPlayerSeekBarPosition: function() {
      var value = (100 / videoEl.duration) * videoEl.currentTime;
      seekBar.value = value;
    },
    togglePlay: function() {
      if (videoEl.paused === true) {
        playerUtils.play();
        playButton.innerHTML = '<img src="images/pause.gif">';
      } else {
        playerUtils.pause();
        playButton.innerHTML = '<img src="images/play.gif">';
      }
    },
    video: {
      initFullScreen: function() {
        if (videoEl.requestFullscreen) {
          videoEl.requestFullscreen();
        } else if (videoEl.mozRequestFullScreen) {
          videoEl.mozRequestFullScreen();
        } else if (videoEl.webkitRequestFullscreen) {
          videoEl.webkitRequestFullscreen();
        }
      }
    }
  };

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