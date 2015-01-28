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
      options: {
        sourceMap: true,
      },
      dev: {
        src: ['src/js/_header.js', 'src/js/audio_controls.js', 'src/js/video.js', 'src/js/player_utils.js', 'src/js/player.js', 'src/js/_footer.js'],
        dest: 'build/js/player.js'
      },
      production: {
        src: ['src/js/_header.js', 'src/js/audio_controls.js', 'src/js/video.js', 'src/js/player_utils.js', 'src/js/player.js', 'src/js/_footer.js'],
        dest: 'build/js/.tmp.player.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: 'build/js/.tmp.player.js.map'
      },  
      dist: {
        src: '<%= concat.production.dest %>',
        dest: 'build/js/player.min.js'
      }   
    },
    jshint: {
      beforeconcat: ['src/js/audio_controls.js', 'src/js/video.js', 'src/js/player_utils.js', 'src/js/player.js'],
      afterconcat: ['build/js/player.js']
    },
    watch: {
      css: {
        files: 'src/scss/*.scss',
        tasks: ['compass'],
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['concat:dev']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build:dev', ['concat:dev', 'compass']);
  grunt.registerTask('build:production', ['concat:production', 'uglify', 'compass']);
  grunt.registerTask('default', ['build:dev']);
  grunt.registerTask('production', ['build:production']);
};
