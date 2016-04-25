var notify  = require('gulp-notify');
var gulp = require('gulp');
gulp.task('finished',['precision'] , function() {
  return gulp.src("dist/css/sprite.scss")
  .pipe(notify("The gulp build is finished. Please press control+C to exit"));
});
