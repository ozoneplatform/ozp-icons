var notify  = require('gulp-notify');
var plumber = require('gulp-plumber');
var gulp = require('gulp');

// Load the PostCSS module.
var postcss = require('postcss');
var post    = require('gulp-postcss');

// Define the plugin.
var precision = postcss.plugin('postcss-precision', function() {
  var longEmTest = /(\d+?\.\d{3,})(%|em|px)/gi;

  return function(style) {
    style.eachDecl(function(decl) {


      if (! decl.value || longEmTest.test(decl.value)) {
        // Grab array of matches.
        var matches = (decl.value + '').match(longEmTest);
        console.log(matches);
        // We'll assume there's one
        if(matches.length === 1){
        var value = matches[0].substr(0, matches[0].length - 1);
        // Round two decimal places.
        var rounded = Math.round(parseFloat(value) * 100) / 100;
        // Change the value in the tree.
        decl.value = decl.value.replace(value, rounded.toString());
      }
      else{
        for(var i = 0; i < matches.length-1; i++) {
          var value = matches[i].substr(0, matches[i].length - 1);
          var rounded = Math.round(parseFloat(value) * 100) / 100;
          decl.value = decl.value.replace(value, rounded.toString());
          for(var j = i; j < matches.length; j++) {
              var value = matches[j].substr(0, matches[j].length - 1);
              // Round two decimal places.
              var rounded = Math.round(parseFloat(value) * 100) / 100;
              // Change the value in the tree.
              decl.value = decl.value.replace(value, rounded.toString());
          }
        }
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
    .pipe(gulp.dest('dist/css'));
});
