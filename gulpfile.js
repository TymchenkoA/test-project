var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
//var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
//var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

gulp.task('scss', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano(),
    ];
    return gulp.src('./styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({}))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/styles'))
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.stream());
});

//gulp.task('sprite', function() {
//    var spriteData =
//        gulp.src('./img/sprite/*.png') // путь, откуда берем картинки для спрайта
//            .pipe(spritesmith({
//                imgName: 'sprite.png',
//                imgPath: './../img/sprite.png',
//                cssName: 'sprite.scss',
//                cssFormat: 'scss'
//            }));
//
//    spriteData.img.pipe(gulp.dest('img/')); // путь, куда сохраняем картинку
//    spriteData.css.pipe(gulp.dest('styles/common/')); // путь, куда сохраняем стили
//});

gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(plumber())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('host', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

//gulp.task('js', function () {
//  return gulp.src(['./js/**/*.js'])
//    .pipe(sourcemaps.init())
//    .pipe(plumber())
//    .pipe(concat('main.js'))
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest('public/scripts'))
//    .pipe(browserSync.stream());
//});

gulp.task('images', function () {
    gulp.src('./img/**/*')
        .pipe(plumber())
        .pipe(imagemin({
            optimalizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('public/img'));
});

gulp.task('watch', function() {
    gulp.watch(['./styles/**/*.scss'], ['scss']);
    //gulp.watch(['./js/**/*.js', '!src/scripts/main.js'], ['js']);
    gulp.watch('index.html', ['html']);
});

gulp.task('default', ['html', 'scss', 'host', 'images', 'watch']);


