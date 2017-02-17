module.exports = function(grunt) {


    var config = {
        app: 'src/public'
    };
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // Project configuration.
    grunt.initConfig({
        sass: { // Task
            server: {
                options: {
                    // sourcemap: true,
                //     sourcemapEmbed: true,
                //     sourcemapContents: true,
                //     includePaths: ['.'],
                //     outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'src/public/styles/scss/',
                    src: ['*.{scss,sass}', '{,**/}*.{scss,sass}'],
                    dest: 'src/public/styles/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: [''],
            },
            css: {
                files: ['src/styles/css/*.css'],
                tasks: [''],
            },
            scss: {
                files: ['src/public/styles/{,**/}*.scss'],
                tasks: ['sass:server']
            }
        },

    });


    grunt.registerTask('serve', [
        'watch'
    ]);
};
