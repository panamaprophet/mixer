'use strict'


import gulp from 'gulp'
import uglify from 'gulp-uglify'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import vinylBuffer from 'vinyl-buffer'

import stylus from 'gulp-stylus'
import autoPrefixer from 'autoprefixer'
import concat from 'gulp-concat'
import postCSS from 'gulp-postcss'


gulp.task('js', () => {

	return browserify('./src/index.js')
		.transform('babelify', { presets : [ 'es2015' ] })
		.bundle()
		.pipe(source('build.js'))
		.pipe(vinylBuffer())
		.pipe(uglify())
		.pipe(gulp.dest('./assets/'))
})


gulp.task('css', () => {

	return gulp.src('./src/styles/index.styl')
		.pipe(stylus({ compress : true }))
		.pipe(concat('build.css'))
		.pipe(postCSS([ autoPrefixer ]))
		.pipe(gulp.dest('./assets/'))
})


gulp.task('default', ['js', 'css'])