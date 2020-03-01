'use strict';

// Requires variables

const gulp = require('gulp');
const { series, parallel } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

// images minify + plugins
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const webp = require('gulp-webp');
//end

const jsmin = require('gulp-jsmin');
const browserSync = require('browser-sync').create();

// Tasks

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./src/*.html', html);
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/js/**/*.js', scripts);
}

function style() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('all.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
};

function fonts() {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
}

function scripts() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function imgMin() {
  gulp.src('./src/img/*')
    .pipe(imagemin([
      imageminJpegRecompress({
        method: 'smallfry'
      }),
      imageminJpegtran(),
      imageminPngquant()
    ]))
    .pipe(gulp.dest('./dist/img/'))
};

exports.style = style;
exports.scripts = scripts;
exports.html = html;
exports.img = imgMin;
exports.fonts = fonts;
exports.rename = rename;
exports.watch = watch;
// exports.watch_nodemon = watch_nodemon;

exports.build = series(parallel(html, style, fonts, scripts, imgMin));