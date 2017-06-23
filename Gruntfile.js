module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json'),
    _watch = {};
  var app = require("./src/app"),
    gruntConfigs = {
      tmpl: {
        options: {
          prefix: "{{ ",
          suffix: " }}",
          includesDir: "./"
        }
      },
      watch: _watch
    };

  app.configs.forEach(function(c) {
    _watch[c.projectName] = {
      files: ["./src/" + c.projectName + "/**/*.pjs", "package.json", "./src/" + c.projectName + "/**/*.js", "./src/app.js", "gruntfile.js", "./src/" + c.projectName + "/**/*.html"],
      tasks: ["ptemplatejs-pjsBuild:" + c.projectName, "tmpl:" + c.projectName],
      options: {
        livereload: true
      }
    }
    gruntConfigs.tmpl[c.projectName] = {
      options: {
        encoding: "utf-8"
      },
      files: [{
        src: "*.html",
        dest: "dist/" + c.projectName + "/html/" + c.version + "/",
        expand: true,
        cwd: "src/" + c.projectName + "/html/"
      }]
    };
  });



  grunt.registerTask("ptemplatejs-pjsBuild", "ptemplatejs-pjsBuild", function(v) {
    console.log("-> ", v)
    app.configs.forEach(function(c) {
      var projectName = c.projectName;
      if (projectName == v) {
        var dirVer = c.version;
        c.modules.files.forEach(function(f) {
          var content = ["'use strict';(function(win, $){/* " + projectName + "/" + grunt.template.today('yyyy-mm-dd hh:mm:ss') + " */"];
          f.modules.forEach(function(m) {
            var l = m.split('.');
            if (l.length === 1) {
              app.template.modules[m] && content.push((app.template.modules[m].style || "") + (app.template.modules[m].template || "") + (app.template.modules[m].script || ""))
            } else {
              app.template.modules[l[0]] && app.template.modules[l[0]][l[1]] && content.push(app.template.modules[l[0]][l[1]]);
            }
          });
          content.push("})(this, pTemplate);");
          var file = pkg.configs.build.path + projectName + "/js/" + dirVer + "/" + f.name + "." + f.version + ".js";
          grunt.file.write(file, content.join(''));
          grunt.log.writeln('file ' + file + ' created.');
        });
      }
    })
  });

  grunt.initConfig(gruntConfigs);

  var tmplpro = require("./bin/pjs-tmpl.js");
  tmplpro(grunt);

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask('default', 'watch');
}