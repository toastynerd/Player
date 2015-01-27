'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      dev: {
        options: {
          cssDir: 'build/css',
          environment: 'development',
          imagesDir: 'images',
          relativeAssets: true,
          sassDir: 'src/scss',
          sourcemap: true,
          trace: true
        }
      }
    },
    concat: {
      dev: {
        src: ['src/js/_header.js', 'src/js/audio_controls.js', 'src/js/video.js', 'src/js/player_utils.js', 'src/js/player.js', 'src/js/_footer.js'],
        dest: 'build/js/player.js'
      }
    },
    jshint: {
      beforeconcat: ['src/js/audio_controls.js', 'src/js/video.js', 'src/js/player_utils.js', 'src/js/player.js'],
      afterconcat: ['build/js/player.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('build:dev', ['concat:dev', 'compass']);
  grunt.registerTask('default', ['build:dev']);
};
