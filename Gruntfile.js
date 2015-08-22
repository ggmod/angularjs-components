module.exports = function(grunt) {

	var buildTasks = ['concat', 'sass', 'copy', 'jshint'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['src/**/*.js', 'demo/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					document: true
				},
				force: true
			}
		},

		concat: {
			options: {
				separator: '\n\n'
			},
			scripts: {
				src: ['src/module.js', 'src/**/*.js'],
				dest: 'build/angular-commons.js'
			},
			sassStyles: {
				src: ['src/**/*.scss'],
				dest: 'build/.tmp/angular-commons.scss'
			},
			demoScripts: {
				src: ['demo/module.js', 'demo/**/*.js'],
				dest: 'build/angular-commons-demo.js'
			}
		},

		sass: {
			styles: {
				options: {
					style: 'expanded'
				},
				files: {
					'build/angular-commons.css': 'build/.tmp/angular-commons.scss'
				}
			}
		},

		copy: {
			htmlTemplates: {
				expand: true,
				cwd: 'src/',
				src: '**/*.html',
				dest: 'build/templates/'
			}
		},

		watch: {
			options: {
				livereload: true
			},
			all: {
				files: ['src/**/*.js', 'src/**/*.scss', 'src/**/*.html', 'demo/**/*'],
				tasks: buildTasks,
				options: {
					spawn: false,
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', buildTasks);
	grunt.registerTask('serve', buildTasks.concat('watch'));

};