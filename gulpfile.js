var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    markdown = require('markdown'),
    fileInclude = require('gulp-file-include');

gulp.task('fileInclude', function() {
    gulp.src(['app/template/index.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file',
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest('./app/'));
});

gulp.task('less', function () {
    return gulp.src('app/template/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
});

gulp.task('watch', ['fileInclude', 'browser-sync', 'less'], function () {
    gulp.watch('app/template/**/*.less', ['less']);
    gulp.watch('app/template/*.less', ['less']);
    gulp.watch('app/less_mixin/*.less', ['less']);
    gulp.watch('app/template/**/*.html', ['fileInclude'], browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);


