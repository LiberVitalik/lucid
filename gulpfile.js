var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    del = require('del'),
    replace = require('gulp-replace'),
    markdown = require('markdown'),
    fileInclude = require('gulp-file-include');

gulp.task('fileInclude', function() {
    gulp.src(['src/template/index.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file',
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest('./src/'));
});

gulp.task('replaceHtml', function(){
    gulp.src(['src/index.html'])
        .pipe(replace('../', ''))
        .pipe(gulp.dest('./src/'));
});

gulp.task('replaceStyle', function(){
    gulp.src(['src/css/style.css'])
        .pipe(replace('../../', '../'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('less', function () {
    return gulp.src('src/template/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'less', 'fileInclude', 'replaceStyle', 'replaceHtml'], function() {
    gulp.src(['src/css/*.css', '!src/css/style.css']).pipe(gulp.dest('dist/css'));
    gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
    gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'));
    gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

gulp.task('watch', ['fileInclude', 'browser-sync', 'less'], function () {
    gulp.watch('src/template/**/*.less', ['less']);
    gulp.watch('src/template/*.less', ['less']);
    gulp.watch('src/less_mixin/*.less', ['less']);
    gulp.watch('src/template/**/*.html', ['fileInclude'], browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);


