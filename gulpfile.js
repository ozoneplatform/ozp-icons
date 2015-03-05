'use strict';

var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var DirectoryColorfy = require('directory-colorfy');

var svgConfig = {
    mode: {
        css: {
            render: { css: true }
        }
    }
};

var colorConfig = {
    dynamicColorOnly: true,
    colors: {
        'black': '#191f25',
        'blue': '#009dd3',
        'blue-dark': '#087399',
        'blue-darker': '#0e5772',
        'blue-light': '#71c9e7',
        'blue-lighter': '#c6e9f5',
        'gray': '#8f9194',
        'gray-base': '#191f25',
        'gray-dark': '#4c5457',
        'gray-darker': '#3b4246',
        'gray-darkest': '#293035',
        'gray-light': '#b5b6b8',
        'gray-lighter': '#dbdcdd',
        'gray-lightest': '#eeeeef',
        'green': '#5a9e5a',
        'green-dark': '#487a4b',
        'orange': '#f59d4c',
        'pink': '#b32a5f',
        'purple': '#814481',
        'Red': '#c62a3d',
        'Red-orange': '#d45a28',
        'Red-orange-dark': '#ad4e27',
        'teal': '#32838c',
        'white': '#ffffff',
        'yellow': '#ecc44d'
    }
};

gulp.task('default', function() {
    var colorfy = new DirectoryColorfy('image-source', 'image-colors', colorConfig);
    colorfy.convert().then(function() {
        gulp.src('image-colors/*.svg')
              .pipe(svgSprite(svgConfig))
              .pipe(gulp.dest('dist'));
    });
});
