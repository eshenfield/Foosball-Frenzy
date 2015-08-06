module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Building
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['./client/app/**/*.js', './client/components/**/*.js'],
        dest: './client/built/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        files: {
          './client/built/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
        }
      }
    },

    // Watching
    watch: {
      scripts: {
        files: [
          'client/app/**/*.js',
          'client/components/**/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      },
      ignore: ['node_modules/**', 'client/bower_components/**'],
      options: {
        'no-preload': true
      }
    }
  });

  // Loads all grunt tasks
  require('load-grunt-tasks')(grunt);

  ////////////////////////////////////////////////////
  // Primary grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('serve', function (target) {

    grunt.task.run([ 'build' ]);

    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);

  });

  ////////////////////////////////////////////////////
  // Secondary grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('build', [
    'concat',
    'uglify'
  ]);
};
