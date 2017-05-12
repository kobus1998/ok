const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')

gulp.task('sass', () => {
  return gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', () => {
  gulp.watch('src/sass/*.sass', ['sass'])
  gulp.watch('src/js/*.js', browserSync.reload)
  gulp.watch('*.html', browserSync.reload)
})

gulp.task('dev', (callback) => {
  runSequence(['sass', 'watch'], 'watch')
  callback
})

gulp.task('build:css', () => {
  return gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:js', () => {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', () => {
  runSequence(['sass','build:css', 'build:js'])
})

gulp.task('default', () => {
  runSequence(['dev'])
})
