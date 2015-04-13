var fs         = require('fs'),
    gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    connect    = require('gulp-connect'),
    jade       = require('gulp-jade'),
    gutil      = require('gulp-util');



gulp.task('scripts', function(){
    return gulp.src('javascripts/index.js')
        .pipe(browserify({ debug: true }))
        .on('error', gutil.log)
        .pipe(gulp.dest('public'));
});

gulp.task('connect', function(){
    connect.server({
        root: 'public',
        port: 8000,
        livereload: false
    });
});

gulp.task('jade', function() {
    return gulp.src(['views/**/*.jade', '!views/layouts/*.jade'])
        .pipe(jade({
            pretty : true,
            locals : JSON.parse(fs.readFileSync('./locals.json'))
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function(){
    gulp.watch('javascripts/**/*.js', ['scripts']);
    gulp.watch(['views/**/*.jade', './locals.json'], ['jade']);
});

gulp.task('default', ['scripts', 'jade', 'watch', 'connect']);

