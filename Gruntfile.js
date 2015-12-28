module.exports = function(grunt){
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %>\n' +
            'Fecha de ultima actualizacion: <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %>\n' +
            'Sitio Web: http://<%= pkg.homepage %>/\n' +
            //'Responsable de Front: <%= pkg.author.name %> (<%= pkg.author.email %>) \n*/' +
            '\n\n',
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['input/index.html']
            }
        },

        less: {
            production: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    "input/css/style.css": "input/less/style.less",
                    "input/css/extra.css": "input/less/extra.less"
                }
            }
        },


        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'input/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'output/images/'
                }]
            }
        },

        //jshint: {
        //    options: {
        //        curly: true,
        //        eqeqeq: true,
        //        eqnull: true,
        //        browser: true
        //    },
        //    uses_defaults: ['input/scripts/*.js','!input/scripts/libs/**']
        //},

        copy: {
//            scripts: {
//                expand: true,
//                //flatten: true, // dont need this now as we'll flatten using rename
//                cwd: 'input/scripts/',
//                src: ['*.js'],
//                dest: 'output/scripts/'
//            },
//            librerias: {
//                expand: true,
//                //flatten: true, // dont need this now as we'll flatten using rename
//                cwd: 'input/scripts/libs',
//                src: ['*.js'],
//                dest: 'output/scripts/libs'
//            },
            stuff: {
                expand: true,
                cwd: 'input/',
                src: ['*.html','css/**','fonts/**','css/**','scripts/**','header/**','footer/**'],
                dest: 'output/'
            }
        },

        uglify: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'output/scripts/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'output/scripts/',
                    ext: '.min.js'
                }]
            }
        },

        watch: {
            html: {
                files: ['input/index.html'],
                tasks: ['htmlhint']
            },
            css: {
                files: ['input/less/*.less'],
                tasks: ['buildcss']
            },
            //img: {
            //    files: ['input/images/*'],
            //    tasks: ['imagemin']
            //},
            js: {
                files: ['input/scripts/*.js'],
                tasks: ['copy','uglify']
            },
            copyAll: {
                files: ['!input/less','input/**'],
                // tasks: ['copy','imagemin']
                tasks: ['copy']
            }
        }
    });


    grunt.registerTask('buildcss',  ['less']);
    //grunt.registerTask('default', ['imagemin']);
//    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);

};