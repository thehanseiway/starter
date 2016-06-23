const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const rupture = require('rupture');
const clean = require('gulp-clean');
const browserSync = require('browser-sync');
const panini = require('panini');

const paths = {
    src: {
        stylus: {
            watch: 'src/stylus/**/*',
            main: 'src/stylus/main.styl'
        },
        html: 'src/panini/pages/**/*.html'
    },
    dist: {
        css: 'dist/css/'
    }
}

gulp.task('css:clean', () => {
    return gulp.src(paths.dist.css)
    .pipe(clean());
});

//==============================================================================
// Panini compile
//==============================================================================
gulp.task('html:compile', function() {
  gulp.src(paths.src.html)
    .pipe(panini({
      root: 'src/panini/pages/',
      layouts: 'src/panini/layouts/',
      partials: 'src/panini/partials/',
      helpers: 'src/panini/helpers/',
      data: 'src/panini/data/'
    }))
    .pipe(gulp.dest('dist'))
    .on('finish', browserSync.reload);
});

 gulp.task('pages:reset', function(done) {
    panini.refresh();
    gulp.watch('html:compile');
    done();
});


gulp.task('css:compile', ['css:clean'], () => {
    return gulp.src(paths.src.stylus.main)
        .pipe(stylus({
            use: [nib(), rupture()]
        }))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('default', ['css:compile', 'html:compile'], function() {

    browserSync.init({
        server: {
            baseDir: "./",
            directory: true
        }
    });

    gulp.watch(paths.src.stylus.watch, ['css:compile']);
    gulp.watch(['src/panini/pages/**/*'], ['html:compile']);
    gulp.watch(['src/panini/{layouts,partials,helpers,data}/**/*'], ['pages:reset']);
});
