var notify  = require('gulp-notify');
var plumber = require('gulp-plumber');
var gulp = require('gulp');

// Load the PostCSS module.
var postcss = require('postcss');
var post    = require('gulp-postcss');

// Define the plugin.
var precision = postcss.plugin('postcss-precision', function() {
  var longEmTest = /(\d+?\.\d{3,})(?=(%|em|px))/gi;

  return function(style) {
    style.walkDecls(function(decl) {

      if (! decl.value || longEmTest.test(decl.value)) {
        // Grab array of matches.
        var matches = (decl.value + '').match(longEmTest);
        // We'll assume there's one
        for(var i = 0; i < matches.length; i++) {
          var value = matches[i];
          var rounded = Math.round(parseFloat(value) * 100) / 100;
          decl.value = decl.value.replace(value, rounded.toString());
        }
      }
    });
  };
});

// Make PostCSS aware of this plugin.
postcss().use(precision);

gulp.task('precision' , function() {
  return gulp.src([
    'dist/css/*.*css'
    ])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(post([precision()]))
    .pipe(gulp.dest('dist/css'))
});
