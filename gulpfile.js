'use strict';

var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),

    // More complex configuration example
    config = {
        shape: {
            dimension : {         // Set maximum dimensions
                maxWidth: 32,
                maxHeight: 32
            },
            spacing: {         // Add padding
                padding: 10
            }
        },
        mode: {
            css: {
                render: { css: true }
            }
        }
    };

gulp.task('default', function() {
    gulp.src('image-source/*.svg')
          .pipe(svgSprite(config))
          .pipe(gulp.dest('dist'));
});
