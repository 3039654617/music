const {src, dest, series, watch} = require('gulp');
const htmlClean = require('gulp-htmlclean');
const cssClean = require('gulp-clean-css');
const cssLess = require('gulp-less');
// const uglify = require('gulp-uglify');
const uglifyImage = require('gulp-imagemin');
const connect = require('gulp-connect');


const path = {
    src: './src/',
    dist: './dist/'
}

function html() {
    return src(path.src + 'html/index.html')
        .pipe(htmlClean())
        .pipe(dest(path.dist + 'html/'))
        .pipe(connect.reload());
}

function css() {
    return src(path.src + 'css/index.less')
        .pipe(cssLess())
        .pipe(cssClean())
        .pipe(dest(path.dist + 'css/'))
        .pipe(connect.reload());
}

function js() {
    return src(path.src + 'js/*')
        .pipe(dest(path.dist + 'js/'))
        .pipe(connect.reload());
}

function image() {
    return src(path.src + 'images/*')
        .pipe(uglifyImage())
        .pipe(dest(path.dist + 'images/'));
}

function server(cb) {
    connect.server({
        port: '2754',
        livereload: true
    })
    cb();
}

watch(path.src + 'html/*',function(cb){
    html();
    cb();
});

watch(path.src + 'css/*',function(cb){
    css();
    cb();
});

watch(path.src + 'js/*',function(cb){
    js();
    cb();
});

exports.default = series(html, css, js, image, server)