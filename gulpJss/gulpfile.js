const { src, dest, parallel,gulp ,task} = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');

const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');

/*set html*/
function html() {
  return src('client/templates/*.pug')
    .pipe(pug())
    .pipe(dest('build/html'))
}

/*css set*/
function css() {
  return src('css/*.css')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('ntest/css'))
}

/*js Compress*/
function js() {
  return src('js/*.php', { sourcemaps: true })
    .pipe(minify())
    .pipe(concat('app.min.php'))
    .pipe(dest('ntest/js', { sourcemaps: false }))
}

/*Image Compress*/
function img() {
 
  var img_src = 'images/**/*', img_dest ='ntest5/';
  return src(img_src)
  .pipe(changed(img_dest))
  .pipe(imagemin())
  .pipe(dest(img_dest));

}

exports.js = js;
exports.css = css;
exports.html = html;
exports.img = img;
exports.default = parallel(html, css, js,img);
