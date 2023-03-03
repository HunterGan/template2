const { src, dest, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del');
const sync = require('browser-sync').create()
/// const gulpCopy = require('gulp-')

function html() {
  return src('src/**.html')
    .pipe((dest('dist')))
}

function images() {
  return src('src/img/**/*.*')
    .pipe((dest('dist/img')))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
}

function clear() {
  return del('dist')
}

exports.clear = clear
exports.build = series(clear, images, scss, html)