'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');

const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// --- dirs ---
const baseDir = "./dist";
// --- dirs ---

// --- imports ---
const srcDir = "./src/";
const html = {
    pages: ['src/index.html','src/html/*.html']
};
// --- imports ---

// --- files ---
const tsFile = "src/main.ts";
const scssFile = "src/main.scss";
// --- files ---

// --- tasks ---
gulp.task('html', function () {
    return gulp.src(html.pages)
        .pipe(gulp.dest(baseDir));
});

gulp.task('sass', function () {
    return gulp.src(scssFile)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(baseDir));
});

gulp.task('ts', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [tsFile],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(baseDir));
});
// --- tasks ---

// --- build task ---
gulp.task('default', ['html','sass','ts'], function () {
    console.log ('Build Files');
});
// --- build task ---

// --- watch task ---
gulp.task('serve', ['default'], function () {
    browserSync.init({
        server: {
            baseDir: baseDir
        }
    });
    gulp.watch(srcDir + '/**/*.ts', ['ts']).on('change', browserSync.reload);
    gulp.watch(srcDir + '/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch(srcDir + "/**/*.html", ['html']).on('change', browserSync.reload);
});
// --- watch task ---


