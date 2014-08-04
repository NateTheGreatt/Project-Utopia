module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.initConfig({
    concurrent: {
      client: ['watch','nodemon'],
      options: {logConcurrentOutput: true}
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
        src: ['server/**/*.ts', 'server.ts'],
        dest: 'server.js',
        options: {
          sourceMap: true,
          module: 'commonjs'
        }
      }
    },
    nodemon: {
      server: {
        script: 'server.js'
      }
    },
    copy: {
      client: {
        files: [
          {
            cwd: 'app',
            expand: true,
            src: ['**/*.html', '!vendor/**/*.html', 'assets/**/*'],
            dest: 'build/'
          }
        ]
      }
    },
    open: {
      client: {
        path: 'http://localhost:3000'
      }
    },
    connect: {
      client: {
        options: {
          port: 1337,
          hostname: '*',
          base: 'build',
          livereload: true
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
        files: ['server/*.ts', '*.ts'],
        tasks: ['typescript:server'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['concurrent']);
  // grunt.registerTask('default', ['typescript', 'copy', 'open', 'connect', 'watch']);
}