'use strict';

const PROJECT_NAME = 'library-app';

const gulp =         require('gulp');
const sass =         require('gulp-sass');
const path =         require('path');
const jade =         require('gulp-jade');
const uglify =       require('gulp-uglifyjs');
const sourcemaps =   require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite =    require("gulp-svg-sprite");
const rename =       require('gulp-rename');
const imagemin =     require('gulp-imagemin');
const pngquant =     require('imagemin-pngquant');
const cache =        require('gulp-cache');
const browserSync =  require('browser-sync').create();
const concat =       require('gulp-concat');
const notify =       require('gulp-notify');
const remember =     require('gulp-remember');
const resolver =     require('stylus').resolver;
const gulpIf =       require('gulp-if');
const rimraf =       require('rimraf');
const isDev =        !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const webpack = require('gulp-webpack');
const gutil = require('gulp-util');

const streamSass =   true;
const singleReload = true;

const paths = {
  build: {
    html:       './dist/',
    js:         './dist/js/',
    css:        './dist/css/',
    img:        './dist/img/',
    fonts:      './dist/fonts/',
    favicons:   './dist/'
  },
  src: {
    jade:       './sources/views/*.jade',
    js:         './sources/js/**/*.js',
    libsDir:    './sources/js/libs/*.js',
    libs:       './sources/libs/*.js',
    style:      './sources/styles/**/**/**/*.{sass,scss,css}',
    img:        './sources/img/**/**/**/*.{jpg,png,gif,svg,jpeg,mp4}',
    fonts:      './sources/fonts/**/**/**/*.{ttf,woff,woff2,eot,svg}',
    favicons:   './sources/favicons/*'
  },
  clean: {
    html:       './dist/*.html',
    js:         './dist/js',
    css:        './dist/css',
    img:        './dist/img',
    fonts:      './dist/fonts',
    all:        './dist',
  }
};

const serverConfig = {
  server: {
    baseDir: paths.build.html
  },
  tunnel:         false,
  host:           'localhost',
  port:           3000,
  logPrefix:      PROJECT_NAME,
  open:           "local",
  ghostMode: {
    clicks:     false,
    forms:      false,
    scroll:     false
  },
  logFileChanges: false,
  logSnippet:     false,
  online:         false,
  ui:             false,
  notify:         false
};

/********************************************************************************
 * {sass,scss,css} & sourcemaps
 ********************************************************************************/
gulp.task('sass', () => {
  return gulp.src(paths.src.style)
      .pipe(gulpIf(isDev, sourcemaps.init()))
      .pipe(sass({
        outputStyle: 'compressed',
        define:{ url:resolver() }
      }).on('error', notify.onError()))
      .pipe(autoprefixer('last 3 version', '> 1%', 'IE 9', { cascade: true }))
      .pipe(gulpIf(isDev, sourcemaps.write('./')))
      .pipe(gulp.dest(paths.build.css))
      .pipe(gulpIf(streamSass, browserSync.stream()));
});

/********************************************************************************
 * jade
 ********************************************************************************/
gulp.task('jade', () => {
  return gulp.src(paths.src.jade)
      .pipe(jade({ pretty: true})).on('error', notify.onError())
      .pipe(gulp.dest(paths.build.html))
      .pipe(gulpIf(singleReload, browserSync.stream()));
});

/********************************************************************************
 * images
 ********************************************************************************/
gulp.task('img', () => {
  return gulp.src(paths.src.img)
      .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      })))
      .pipe(gulp.dest(paths.build.img))
      .pipe(gulpIf(singleReload, browserSync.stream()));
});

/********************************************************************************
 * javascript libraries
 ********************************************************************************/
gulp.task('libs', () => {
  return gulp.src(paths.src.libs)
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.build.js))
      .pipe(gulpIf(singleReload, browserSync.stream()));
});

/********************************************************************************
 * custom javascript
 ********************************************************************************/
gulp.task('javascript', function () {
  return gulp.src(['sources/js/core.js',
    'sources/js/modules/**/*.js'])
      .pipe(webpack(require('./webpack.config.js')))
      .on('error', gutil.log)
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.build.js));
});

/********************************************************************************
 * svg-sprite html
 ********************************************************************************/
gulp.task('svg', () => {
  return gulp.src(['./sources/svgs/html/*.svg'])
      .pipe(svgSprite({
        mode: {
          symbol: {
            dist:   './',
            inline: false,
            sprite: './svg-sprite.svg'
          }
        }
      }))
      .on('error', (error) => { console.log(error); })
      .pipe(gulp.dest(paths.build.img));
});

/********************************************************************************
 * svg-sprite css
 ********************************************************************************/
gulp.task('svg-css', () => {
  return gulp.src(['./sources/svgs/css/*.svg'])
      .pipe(svgSprite({
        mode: {
          css: {
            dest: '.',
            sprite: 'svg-sprite.svg',
            layout: 'vertical',
            prefix: '.i-',
            dimensions: true,
            render: {
              scss: {
                dest: '_sprite.scss'
              }
            }
          }
        }
      }))
      .on('error', (error) => { console.log(error); })
      .pipe(gulpIf('*.scss', gulp.dest('./sources/styles/003-patterns'), gulp.dest(paths.build.css)));
});

/********************************************************************************
 * clean
 ********************************************************************************/
gulp.task('clean', (cb) => {
  let cl = paths.clean;
  rimraf(cl.all, cb);
});

/********************************************************************************
 * watch
 ********************************************************************************/

gulp.task('watch', () => {

  let filepath = (filepath) => {
    remember.forget('svg-css', path.resolve(filepath));
  }, src = paths.src;

  gulp.watch([src.style],                   gulp.series('sass')).on('unlink', filepath);
  gulp.watch(['./sources/views/**/*.jade'], gulp.series('jade')).on('unlink', filepath);
  gulp.watch([src.img],                     gulp.series('img')).on('unlink', filepath);
  gulp.watch([paths.src.libs],              gulp.series('javascript', 'libs')).on('unlink', filepath);
  gulp.watch([src.js],                      gulp.series('javascript')).on('unlink', filepath);
  gulp.watch(['./sources/svgs/html/*.svg'], gulp.series('svg')).on('unlink', filepath);
  gulp.watch(['./sources/svgs/css/*.svg'],  gulp.series('svg-css')).on('unlink', filepath);

});

/********************************************************************************
 * Copy files/folders
 ********************************************************************************/
gulp.task('copy', () => {
  return gulp.src(paths.src.fonts)
      .pipe(gulp.dest(paths.build.fonts))
});

/********************************************************************************
 * Copy files/folders
 ********************************************************************************/
gulp.task('favicons', () => {
  return gulp.src(paths.src.favicons).pipe(gulp.dest(paths.build.favicons))
});

/*******************************************************************************
 * build
 *******************************************************************************/
gulp.task('build', gulp.series( 'clean',
    gulp.parallel( 'sass', 'javascript', 'libs', 'svg', 'svg-css', 'img'), 'jade', 'copy', 'favicons'),
'watch');

/********************************************************************************
 * server start
 ********************************************************************************/
gulp.task('server', () => { browserSync.init(serverConfig) });

/********************************************************************************
 * default
 ********************************************************************************/
gulp.task('default', gulp.series('build', gulp.parallel('watch','server')));