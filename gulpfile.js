let preprocessor = 'scss',
    fileswatch = 'html, css',
    baseDir = 'app',
    online = true;

let paths = {

    scripts: {
        src: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/nouislider/distribute/nouislider.min.js',
            'node_modules/imask/dist/imask.min.js',
            baseDir + '/js/swiper-bundle.min.js',
            baseDir + '/js/wNumb.min.js',
            baseDir + '/js/selectric.min.js',
            baseDir + '/js/jquery.nanoscroller.min.js',
            baseDir + '/js/app.js'
        ],
        dest: baseDir + '/js',
    },

    styles: {
        src: [
            'node_modules/normalize.css/normalize.css',
            baseDir + '/' + preprocessor + '/nouislider.scss',
            baseDir + '/' + preprocessor + '/swiper-bundle.min.scss',
            baseDir + '/' + preprocessor + '/main.scss'
        ],
        dest: baseDir + '/css',
    },

    cssOutputName: 'app.min.css',
    jsOutputName: 'app.min.js',
}

const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const rsync = require('gulp-rsync');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false,
        online: online
    })
}

function svgs() {
    return src(baseDir + '/svg/*.svg')
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    },
                },
            }
        ))
        .pipe(dest(baseDir + '/img/'));
}

function scripts() {
    return src(paths.scripts.src)
        .pipe(concat(paths.jsOutputName))
        // .pipe(uglify())
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function deploy() {
    return src('app/**')
        .pipe(rsync({
            root: 'app/',
            hostname: 'studioatom_main@studioatom.beget.tech',
            destination: 'gaz.studioatom.beget.tech/wp-content/themes/gaz',
            relative: true,
            archive: true,
            checksum: true,
            silent: false,
            chmod: "ugo=rwX",
            compress: true
        }))
}

function styles() {
    return src(paths.styles.src)
        .pipe(newer(paths.styles.dest))
        .pipe(sass())
        .pipe(concat(paths.cssOutputName))
        // .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        // .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function startwatch() {
    watch(baseDir + '/' + preprocessor + '/**/*', {usePolling: true}, styles);
    watch('*.html').on("change", browserSync.reload);
    watch(baseDir + '/**/*.{' + fileswatch + '}', {usePolling: true}).on('change', browserSync.reload);
    watch([baseDir + '/js/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], {usePolling: true}, scripts);
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.svgs = svgs;
exports.deploy = deploy;
exports.default = series(scripts, styles, parallel(browsersync, startwatch));