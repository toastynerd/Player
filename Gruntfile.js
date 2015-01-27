'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    concat: {
      dev: {
        src: ['src/_header.js', 'src/audio_controls.js', 'src/video.js', 'src/player_utils.js', 'src/player.js', 'src/_footer.js'],
        dest: 'build/player.js'
      }
    }
  });

  grunt.registerTask('build:dev', ['concat:dev']);
  grunt.registerTask('default', ['build:dev']);
};
