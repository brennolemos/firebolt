const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.imgs', 'app.fonts']);

gulp.task('app.html', () => {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'))
});

gulp.task('app.css', () => {
    return gulp.src('src/assets/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({ 'uglifyComments': true }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('app.js', () => {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('app.imgs', () => {
    return gulp.src('src/assets/imgs/**/*.*')
        .pipe(gulp.dest('assets/imgs'))
});

gulp.task('app.fonts', () => {
    return gulp.src('src/assets/fonts/*.*')
        .pipe(gulp.dest('assets/webfonts'))
});