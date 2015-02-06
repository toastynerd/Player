'use strict';

describe('video', function() {
  it('should have the initFullScreen object', function() {
    var video = new Video();
    expect(typeof(video)).to.eql('object');
  });
});
