'use strict';

var colors = require('./colors.json');
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var DirectoryColorfy = require('directory-colorfy');
var path = require('path');
var fs = require('fs-extra');
var Promise = require('bluebird');
var copy = Promise.promisify(fs.copy, fs);

var SRC_SVG = 'svg';
var TEMP_COLORFY_DIR = 'svg-colorfy'; // gitignored

var svgConfig = {
    log: 'info',
    mode: {
        css: {
            prefix: '.icon-',
            dimensions: true,
            example: true,
            bust: true,
            render: {
                css: {
                    template: path.join(__dirname, 'sprite.css.tmpl')
                },
                scss: {
                    template: path.join(__dirname, 'sprite.scss.tmpl')
                },
                less: {
                    template: path.join(__dirname, 'sprite.less.tmpl')
                }
            }
        }
    }
};

var colorConfig = {
    dynamicColorOnly: true,
    colors: colors
};

function copyAndRenameSrcFiles () {
    var src = fs.readdirSync(SRC_SVG);
    var target = src.map(function (file) {
        return path.join(TEMP_COLORFY_DIR, file.replace(/colors-.*/, 'svg'));
    });

    return Promise.all(src.map(function (file, index) {
        return copy(SRC_SVG + '/' + file, target[index])
    }));
}

var colorfy = new DirectoryColorfy(SRC_SVG, TEMP_COLORFY_DIR, colorConfig);

fs.removeSync('dist');

gulp.task('default', function() {
    return Promise.all([copyAndRenameSrcFiles(), colorfy.convert()])
        .then(function() {
            gulp.src([TEMP_COLORFY_DIR + '/*.svg'])
                .pipe(svgSprite(svgConfig))
                .pipe(gulp.dest('dist'));
        });
});
