var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngCruch = require('imagemin-pngcrush');


var env,
    jsSrc,
    sassStyleSrc,
    allSassSrc,
    outputDir,
    sassconfig,
    outputStyle,
    htmlsrc,
    imgSrc;

env = process.env.NODE_ENV || 'developments';

if(env === 'developments'){
    outputDir = 'builds/developments';
    sassconfig = 'outputStyle';
    outputStyle = 'expanded';
}else{
    outputDir = 'builds/productions';
    sassconfig = 'config_file';
    outputStyle = 'config.rb';
}

jsSrc = 'components/scripts/*.js';
sassStyleSrc = 'components/sass/style.scss';
allSassSrc = 'components/sass/**/*.scss';
htmlsrc = 'builds/developments/*.html'
imgSrc = 'builds/developments/images/*.*';

gulp.task('compass', function(){
    gulp.src(sassStyleSrc)
        .pipe(compass({
            sass: 'components/sass', 
            image: outputDir +  '/images', 
            sassconfig: outputStyle }))
        .on('error', gUtil.log)
        .pipe(gulp.dest(outputDir + '/css'))
        .pipe(connect.reload())
});


gulp.task('js', function(){
    gulp.src(jsSrc)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpIf(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + '/js'))
        .pipe(connect.reload())
});

gulp.task('html', function(){
   gulp.src(htmlsrc)
        .pipe(gulpIf(env === 'production', minifyHtml()))
        .pipe(gulpIf(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('images', function(){
   gulp.src(imgSrc)
       .pipe(gulpIf(env === 'production', imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngCruch()]
        })))
       .pipe(gulpIf(env === 'production', gulp.dest(outputDir + '/images')))
       .pipe(connect.reload())
});

gulp.task('connect', function(){
   connect.server({
       root: outputDir,
       livereload: true
   });
});

gulp.task('watch', function(){
    gulp.watch(jsSrc, ['js']);
    gulp.watch(allSassSrc, ['compass']);
    gulp.watch(htmlsrc, ['html']);
    gulp.watch(imgSrc, ['images']);
});


gulp.task('default', ['html', 'js', 'compass', 'connect', 'images', 'watch']);


