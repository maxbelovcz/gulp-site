const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();

const concat = require('gulp-concat');

const uglify = require('gulp-uglify-es').default;

const scss = require('gulp-sass')(require('sass'));

const autoprefixer = require('gulp-autoprefixer');

const clean = require('gulp-clean');

const newer = require('gulp-newer');

const fonter = require('gulp-fonter');

const ttf2woff2 = require('gulp-ttf2woff2');

const include = require('gulp-include');

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function fonts() {
    return src('app/fonts/src/.')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/dist/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts/dist'))
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function styles() {
    return src('app/scss/main.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 5 versions'], grid: true }))
        .pipe(concat('main.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'node_modules/inputmask/dist/inputmask.js',
        'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
        'node_modules/aos/dist/aos.js',
        'app/js/*.js',
        '!app/js/*.min.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}


function buildcopy() {
    return src([
        'app/css/main.min.css',
        'app/js/main.min.js',
        'app/img/**/*.*',
        'app/fonts/*.*',
        'app/*.html',
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function cleandist() {
    return src('dist', { allowEmpty: true }).pipe(clean())
}

function watching() {
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch(['app/scss/main.scss'], styles);
    watch(['app/fonts/src'], fonts);
    watch(['app/components/*.html', 'app/pages/*.html'], pages);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;

exports.scripts = scripts;

exports.pages = pages;

exports.styles = styles;

exports.fonts = fonts;

exports.build = series(cleandist, styles, scripts, buildcopy);

exports.default = parallel(styles, scripts, browsersync, pages, fonts, watching);