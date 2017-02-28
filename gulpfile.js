const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const webpack = require('gulp-webpack');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('generate-web', ['clean-dist'], function() {
    return gulp.src('public/**/*.main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('generate-sass', function() {
    return gulp.src('public/**/*.main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(function (path) {
            path.basename = path.basename.split('.')[0];
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('watch-sass', function() {
    return gulp.watch('public/**/*.scss', ['generate-sass']);

});

gulp.task('watch-js', function() {
    return gulp.watch(['public/**/*.js', '!public/dist/**/*.js'], ['generate-web']);
});

gulp.task('watch-all', ['watch-sass', 'watch-js']);

gulp.task('clean-dist', function () {
    return gulp.src('public/dist/**/*')
        .pipe(clean())
})