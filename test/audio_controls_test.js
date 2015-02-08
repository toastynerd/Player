'use strict';

describe('audio controls', function() {
  var audio;
  before(function() {
    var el = $(document.createElement('div'));
    el.append('<div class="video-frame"></div>')
      .append('<div class="mute"></div>')
      .append('<div class="volume-bar"></div>');
    var nativeEl = el.get(0);
    audio = new AudioControls(nativeEl);
  });

  it('should be initialized', function() {
    expect(typeof(audio)).to.eql('object');
    expect(audio).to.have.property('videoEl');
    expect(audio).to.have.property('muteButton');
    expect(audio).to.have.property('volumeBar');
  });

  it('should be able to be muted', function() {
    audio.videoEl.muted = false;
    audio.mute();
    expect(audio.videoEl.muted).to.be.true;
    expect(audio.muteButton.innerHTML).to.eql('<img src="images/mute.gif">');
  });

  it('shold be able to unmute', function() {
    audio.videoEl.muted = true;
    audio.unmute();
    expect(audio.videoEl.muted).to.be.false;
    expect(audio.muteButton.innerHTML).to.eql('<img src="images/unmute.gif">');
  });

  it('should be able to set volume', function() {
    audio.volumeBar.value = 10
    audio.setVolume();
    expect(audio.videoEl.volume).to.eql(10);
  });

  it('should toggle mute on', function() {
    audio.videoEl.muted = false;
    audio.toggleMute();
    expect(audio.videoEl.muted).to.be.true; 
  });

  it('should toggle mute off', function() {
    audio.videoEl.muted = true;
    audio.toggleMute();
    expect(audio.videoEl.muted).to.not.be.true;
  });
});
