var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
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

gulp.task('html', function () {
  return gulp.src('./view/**/*')
    .pipe(gulp.dest('dist/view/'));
});

gulp.task('script', function () {
  return gulp.src('./js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('image', function() {
  return gulp.src(['./less/common/img/**/*', './less/page/img/**/*'])
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('watch', function () {
  gulp.watch(['./less/**/*'], ['less']);
  gulp.watch(['./js/**/*'], ['script']);
  gulp.watch(['./view/**/*'], ['html']);
});

gulp.task('default', ['less', 'image', 'script', 'html']);
