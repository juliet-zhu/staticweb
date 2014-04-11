/*
 * grunt-init-staticweb
 * create by juliet
 * Licensed under the MIT license.
 */
'use strict';

// Basic template description.
exports.description = 'Create a static web template.'

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Hey,Juliet,remember to be more efficiency.'

// Template-specific notes to be displayed after queation prompts.
exports.after = 'You should now install project dependencies with _npm' +
  'install_.After that ,you may execute project tasks with _grunt_.' 

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({},[
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description','The static web template'),
    init.prompt('author_name','Juliet'),
    init.prompt('author_email','juliet.zhu.work@gmail.com')
  ],function(err,props){
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: '**'});

    //Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json',{
      name:props.name,
      title:props.title,
      description:props.description,
      email:props.author_email,
      author:props.author_name,
      devDependencies:{
        "grunt-contrib-clean": "~0.5.0",
        "grunt-contrib-connect": "~0.7.0",
        "grunt-contrib-copy": "~0.5.0",
        "grunt-contrib-cssmin": "~0.8.0",
        "grunt-contrib-jade": "~0.10.0",
        "grunt-contrib-stylus": "~0.13.0",
        "grunt-contrib-uglify": "~0.3.2",
        "grunt-contrib-watch": "~0.5.3",
        "grunt-contrib-jshint": "~0.6.0",
        "connect-livereload": "~0.3.2",
        "grunt-modernizr": "~0.5.2",
        "grunt-usemin": "~2.1.0",
        "grunt-contrib-concat": "~0.3.0",
        "load-grunt-tasks": "~0.2.0",
        "time-grunt": "~0.2.0"
      }
    });
    // All done!
    done();
  });
}