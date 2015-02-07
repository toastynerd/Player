'use strict';

describe('video', function() {
  var video;
  before(function() {
    var el = $(document.createElement('div'));
    video = new Video(el);
  });

  it('should be an object', function() {
    expect(typeof(video)).to.eql('object');
  });

  it('should have the initFullScreen Function', function() {
    expect(video).to.have.property('initFullScreen'); 
    expect(typeof(video.initFullScreen)).to.eql('function');
  });

  it('should have a div', function() {
    expect(video.el[0].outerHTML).to.eql('<div></div>');
  });

  describe('vanilla request full screen', function() {
    before(function() {
      video.el.requestFullscreen = sinon.spy();
    });

    after(function() {
      video.el.requestFullscreen = undefined;
    });

    it('should call requestFullscreen', function() {
      video.initFullScreen();
      expect(video.el.requestFullscreen.called).to.be.true;
    });
  });

  describe('firefox full screen request', function() {
     before(function() {
      video.el.mozRequestFullScreen = sinon.spy();
    });

    after(function() {
      video.el.mozRequestFullScreen = undefined;
    });

    it('should call mozRequestFullscreen', function() {
      video.initFullScreen();
      expect(video.el.mozRequestFullScreen.called).to.be.true;
    });
  });

  describe('webkit full screen request', function() {
     before(function() {
      video.el.webkitRequestFullscreen = sinon.spy();
    });

    after(function() {
      video.el.webkitRequestFullscreen = undefined;
    });

    it('should call mozRequestFullscreen', function() {
      video.initFullScreen();
      expect(video.el.webkitRequestFullscreen.called).to.be.true;
    });
  });

});
