var gulp = require('gulp');

gulp.task('watch',function(){
  gulp.watch('dist/css/sprite.css',['precision']);
  gulp.watch('dist/css/sprite.scss',['precision']);

})
