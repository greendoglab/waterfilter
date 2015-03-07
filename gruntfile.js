module.exports = function(grunt) {

    grunt.initConfig({

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    'src/assets/css/style.css': 'src/assets/sass/style.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 10 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'src/assets/css/*.css',
                dest: 'production/static/css/'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'production/static/css/style.min.css': ['production/static/css/style.css']
                }
            }
        },

        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jQuery-Mask-Plugin/dist/jquery.mask.min.js',
                    'src/assets/js/scripts.js'
                ],
                dest: 'production/static/js/production.js',
            }
        },

        uglify: {
            build: {
                src: 'production/static/js/production.js',
                dest: 'production/static/js/production.min.js',
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'production/static/images/'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/normalize.css',
                        src: ['normalize.css'],
                        dest: 'production/static/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/fontawesome/fonts',
                        src: ['*'],
                        dest: 'production/static/fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/fontawesome/css',
                        src: ['font-awesome.min.css'],
                        dest: 'production/static/css/',
                        filter: 'isFile'
                    },
                ],
            },
        },

        includereplace: {
            your_target: {
                expand: true,
                // Files to perform replacements and includes with
                cwd: 'src/html/',
                src: '*.html',
                // Destination directory to copy files to
                dest: './production'
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['src/assets/js/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['src/assets/sass/*.scss', 'src/assets/sass/*/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    spawn: false,
                    livereload: false,
                }
            },
            autoprefixer: {
                files: 'src/assets/css/**',
                tasks: ['autoprefixer']
            },
            images: {
                files: ['src/assets/images/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
            },
            includereplace: {
                files: ['src/html/*.html', 'src/html/partials/*.html'],
                tasks: ['includereplace']
            }
        },

        connect: {
            server: {
                options: {
                    post: 8000,
                    base: 'production'
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', ['copy', 'includereplace', 'concat', 'imagemin', 'sass',
     'autoprefixer', 'uglify', 'cssmin']);
    grunt.registerTask('run', ['connect', 'copy', 'includereplace', 'concat', 'imagemin',
        'sass', 'autoprefixer', 'uglify', 'cssmin', 'watch']);
    grunt.registerTask('default', ['run'])

};
