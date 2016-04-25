var gulp = require('gulp');

gulp.task('watch',function(){
  gulp.watch('dist/css/sprite.css',['precision','finished']);
  gulp.watch('dist/css/sprite.scss',['precision','finished']);

})
