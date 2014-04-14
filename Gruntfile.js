module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ''
            },
            css: {
                src: [
                    'node_modules/noscript/css/noscript.css',
                    'views/**/*.css'
                ],
                dest: 'dist/<%= pkg.name %>.css'
            },
            js: {
                src: [
                    'layouts/**/*.js',
                    'models/**/*.js',
                    'routes/**/*.js',
                    'views/**/*.js',
                    'views/todo.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        yate: {
            options: {
                runtime: true
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.yate.js': [
                        'node_modules/noscript/yate/noscript.yate',
                        'views/prj.yate',
                        'views/*/*.yate'
                    ]
                }
            }
        },
        watch: {
            files: [
                '<%= concat.css.src %>',
                '<%= concat.js.src %>',
                'views/*/*.yate'
            ],
            tasks: ['concat', 'yate']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-yate');

    grunt.registerTask('default', ['concat', 'yate', 'watch']);

};
