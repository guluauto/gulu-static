var less = require('gulp-less');
var path = require('path');

gulp.task('less', function() {
  gulp.src('./component/**/*.less')
    .pipe(less({
          paths: [path.join(__dirname, 'common/base'), path.join(__dirname, 'common/component')]
        }))
    .pipe(gulp.dest(function (file) {
          return file.base.replace(file.cwd, '.');
        }));

  gulp.src('./common/img/**/*.*')
    .pipe(gulp.dest('./component/img/'));
});

gulp.task('default', ['less']);
