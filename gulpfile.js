var gulp      = require('gulp');
    uglify    = require('gulp-uglify'),
    less      = require('gulp-less'),
    concat    = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    svgstore  = require('gulp-svgstore'),
    svgmin    = require('gulp-svgmin'),
    myip      = require('quick-local-ip'),
    connect   = require('gulp-connect'),
    clean     = require('gulp-clean'),
    imagemin  = require('gulp-imagemin');

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

// GERAR SVG

    // limpando svg
    gulp.task('clean-svg', function () {
      return gulp.src('assets/images/svg/svg.svg', {read: false})
        .pipe(clean());
    });

    // gerando svg
    gulp.task('svg', ['clean-svg'], function () {
        return gulp.src('assets/images/svg/**/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('assets/images/svg'))
    });

// OTIMIZANDO IMAGENS
gulp.task('images', function() {
    return gulp.src([
        'assets/images/**/*.gif',
        'assets/images/**/*.jpg',
        'assets/images/**/*.png'
    ])
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('assets/images/'))
});

// HTML RELOAD
gulp.task('htmlreload',function(){
    gulp.src('assets/*.html')
    .pipe(connect.reload());
});

// OTIMIZAR OS SCRIPTS
var global = [
    'assets/js/plugins/jquery.js',
    'assets/js/plugins/mask.js',
    'assets/js/plugins/modernizr.js',
    'assets/js/plugins/owl.carousel.js',
    'assets/js/plugins/placeholder.js',
    'assets/js/plugins/validate.js',
    'assets/js/modules/main.js'
];

gulp.task('scripts', function() {
    gulp.src(global)
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('connect', function() {
    connect.server({
        host: myip.getLocalIP4(),
        livereload: true
    });
});

gulp.task('less', function() {
    gulp.src('assets/less/main.less')
    .pipe(less())
    .on('error', swallowError)
    .pipe(minifyCSS())
    .pipe(gulp.dest('assets/css'))
    .pipe(connect.reload());
});

// WATCH LESS, SCRIPTS E LIVERELOAD
gulp.task('watch', function() {
    gulp.watch('assets/*.html', ['htmlreload']);
    gulp.watch('assets/less/**/*.less', ['less']);
});

gulp.task('default', ['less', 'scripts', 'svg', 'connect', 'watch']);