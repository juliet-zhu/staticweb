'use strict';
module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    copy:{
      dev:{
        cwd:'source',
        src:['**','!**/*.jade','!**/*.styl','!pages/template'],
        dest:'dev',
        expand:true
      },
      pub:{
        cwd:'dev',
        src:['**','!pages/**'],
        dest:'pub',
        expand:true
      },
      pages:{
        options:{
          process:function(content,srcpath){
            return content.replace(/\.\.\//gi,"");
          }
        },
        cwd:'dev/pages',
        src:['**'],
        dest:'pub',
        expand:true
      }
    },
    clean:{
      dev:{
        src:['dev']
      },
      pub:{
        src:['pub']
      }
    },
    stylus:{
      dev:{
        files:{
          'dev/css/main.css':['source/css/main.styl']
        }
      }
    },
    concat:{
      pub:{
        files:{
          'pub/js/components/components.js':[
            'pub/js/components/*.js']
        }       
      } 
    },
    cssmin:{
      pub:{
        expand: true,
        cwd: 'dev/css/',
        src: 'main.css',
        dest: 'pub/css/',
        ext: '.min.css'
      }
    },
    uglify:{
      options:{
        mangle:false
      },
      pub:{
        files:{
        'pub/js/components/components.min.js':['pub/js/components/components.js']
        } 
      }   
    },
    usemin:{
      html:'pub/*.html',
    },
    jade:{
      compile:{
        options:{
          pretty:true
        },
        files:[{
          expand: true,
          cwd:'source',
          src:['**/*.jade','!pages/template/*.jade'],
          dest:'dev',
          ext:'.html'
        }]
      }
    },
    jshint:{
      all:['Gruntfile.js','source/js/*.js']
    },
    watch:{
      options:{
        livereload:true
      },
      stylesheets:{
        files:'source/**/*.styl',
        tasks:'stylus'
      },
      jade:{
        files:'source/**/*.jade',
        tasks:['jade']
      },
      copy:{
        files:['source/**','!source/**/*.styl','!source/**/*.jade'],
        tasks:['copy:dev']
      },
      gruntfile:{
        files:['Gruntfile.js']
      },
      livereload:{
        options:{
          livereload:'<%= connect.options.livereload %>'
        },
        files:[
          'source/**/*.styl',
          'source/**/*.jade'
        ]
      }
    },
    connect:{
      options:{
        port:35728,
        livereload:true,
        hostname:'localhost'
      },
      livereload:{
        options:{
          open:true
        }
      }
      }
    }
  });
  

  // Define the tasks
  grunt.registerTask(
    'pub',
    'Minify js and css.',
    ['clean:pub','copy:pub','copy:pages','connect','watch']
  );

  grunt.registerTask(
    'dev', 
    'Compiles all of the assets and copies the files to the dev directory.', 
    [ 'clean:dev','copy:dev', 'stylus', 'jade' ]
  );

  grunt.registerTask(
    'default', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'dev', 'connect', 'watch' ]
  );
}