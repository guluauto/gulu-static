var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('less', function() {
  gulp.src('./less/page/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'base'), path.join(__dirname, 'less', 'component')]
    }))
    .pipe(gulp.dest('dist/css/'));

  gulp.src('./less/common/img/**/*.*')
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('html', ['clean'], function () {
  return gulp.src('./view/**/*.html')
    .pipe(gulp.dest('dist/view/'));
});

gulp.task('script', ['clean'], function () {
  return gulp.src('./js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('image', ['clean'], function() {
  return gulp.src(['./less/common/img/**/*', './less/page/img/**/*'])
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('watch', function () {
  gulp.watch(['./less/**/*'], ['less']);
  gulp.watch(['./js/**/*'], ['script']);
});

gulp.task('default', ['less', 'image', 'script', 'html']);
