module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.initConfig({
    concurrent: {
      client: ['watch','nodemon'],
      options: {logConcurrentOutput: true}
    },
    simplemocha: {
      all: {
        src: ['tests/**/*.js'],
        timeout: 6000
      }
    },
    typescript: {
      client: {
        src: ['client/scripts/**/*.ts'],
        dest: 'client/main.js',
        options: {
          sourceMap: true,
          module: 'amd'
        }
      },
      server: {
        src: ['server.ts'],
        options: {
          sourceMap: true,
          module: 'commonjs'
        }
      },
      game: {
        src: ['server/*.ts'],
        options: {
          sourceMap: true,
          module: 'commonjs'
        }
      },
      tests: {
        src: ['tests/tests.ts'],
        dest: 'tests/tests.js',
        options: {
          sourceMap: true,
          module: 'commonjs'
        }
      },
    },
    nodemon: {
      server: {
        script: 'server.js'
      }
    },
    express: {
      server:{
        options: {
          script: 'server.js'
        }
      }
    },
    watch: {
      client: {
        files: 'client/scripts/**/*.ts',
        tasks: ['typescript:client'],
        options: {
          livereload: true
        }
      },
      server: {
        files: ['server.ts','server/*.ts', 'tests/*.ts'],
        tasks: ['typescript:server', 'typescript:tests'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['concurrent:client']);
  grunt.registerTask('test', ['typescript:tests', 'simplemocha']);
  grunt.registerTask('compile', ['typescript']);
  

};