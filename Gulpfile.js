var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    header = require('gulp-header'),
    qunit = require('gulp-qunit');

gulp.task('compile', function() {
    var heading = '/* (c) Diego Cardozo - license: https://github.com/diegocard/perf.js/blob/master/LICENSE */\n';

    gulp.src([
        './src/*.js'
    ])
        .pipe(concat('perf.js'))
        .pipe(header(heading))
        .pipe(gulp.dest('dist'))
        .pipe(size({title: 'Unminified'}))
        .pipe(uglify())
        .pipe(header(heading))
        .pipe(rename('perf.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(size({title: 'Minified'}))
        .pipe(size({title: 'Minified and gzipped', gzip: true}));
});

gulp.task('watch', function() {
    return gulp.watch('src/*.js', ['default']);
});

gulp.task('test', function() {
    return gulp.src('./test/UnitTests.html')
        .pipe(qunit());
});

gulp.task('default', ['compile']);
