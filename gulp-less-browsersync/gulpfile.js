var gulp = require('gulp');
var notify = require('gulp-notify');
// RELOAD modules
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
// LESS related modules
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');


// Compile LESS, autoprefix CSS3, minify...
// and save to target CSS directory
gulp.task('less', function () {
    return gulp.src('./less/theme.less')
        .pipe(less())
        .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest('./css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(notify('LESS Compiled'))
});

// Watch task. Keep an eye on less files for changes...
gulp.task('watch', function () {
    gulp.watch('./less/custom/*.less', ['less']);
    gulp.watch('./less/*.less', ['less']);
	// reload page after dose file changes
	gulp.watch("*.html").on("change", reload);
    gulp.watch("./css/*.css").on("change", reload);
});

// Browsersync
gulp.task('reload', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// What tasks does running gulp trigger?
gulp.task('default', ['less', 'watch', 'reload']);
