const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyes'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	image = require('gulp-image'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	wait = require('gulp-wait'),
	rsync = require('gulp-rsync');

// JavaScripts

gulp.task('js', function () {
	return gulp.src([
		// add new js libs
		'src/js/main.js' // alwayse in the end
	])
		.pipe(concat('main.min.js'))
		// .pipe(uglify()) // minimize all js
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({stream: true}));
});

// Browser localhost

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

// CSS & SASS


gulp.task('sass', function () {
	return gulp.src('src/sass/**/*.sass')
		.pipe(wait(50))
		.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

// Watcher

gulp.task('watch', ['sass', 'js', 'browser-sync', 'imagemin', 'html'], function () {
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/js/main.js', ['js']);
	gulp.watch('src/*.html', ['html']);
});

// Images

gulp.task('imagemin', function () {
	return gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(image())
		.pipe(gulp.dest('dist/img'));
});
gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
});

// THE END

gulp.task('build', ['remove', 'imagemin', 'sass', 'js', 'html'], function () {

});


//Delete & clean

gulp.task('remove', function () {
	return del.sync('dist');
});
gulp.task('clean', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);