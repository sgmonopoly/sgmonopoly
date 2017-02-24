const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename')
const clean = require('gulp-clean')
const webpack = require('gulp-webpack')

gulp.task('generate-web', ['clean-dist'], function() {
    return gulp.src('public/**/*.main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('clean-dist', function () {
    return gulp.src('public/dist/**/*')
        .pipe(clean())
})