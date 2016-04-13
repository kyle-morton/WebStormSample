var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');

gulp.task('js', function() {
    return gulp.src(['app/*.js',
            'app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('minify-css', function() {
    return gulp.src([
        'app/*.css',
        'bower_components/html5-boilerplate/dist/css/main.css',
        'bower_components/html5-boilerplate/dist/css/normalize.css'
    ])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('app/dist'));
});

gulp.task('angular', function() {
    return gulp.src([
            'app/*.js',
            'app/view1/*.js',
            'app/view2/*.js',
            'app/controllers/*.js'
        ])
        .pipe(jshint())                   //lint JS for errors
        .pipe(jshint.reporter('default')) // " "
        .pipe(ngAnnotate())			   //this minifies angular regardless of style
        .pipe(concat('all.js'))		   //concat all js files together (all.js)
        .pipe(uglify())				   //minify results
        .pipe(gulp.dest('app/dist'));  //save in dist folder
});

gulp.task('angular-resources', function() {

   return gulp.src([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js'
        ])
       .pipe(concat('angular-resources.js'))    //concat all js files together (resources.js)
       .pipe(uglify())
       .pipe(gulp.dest('app/dist'));  //save in dist folder
});

gulp.task('other-resources', function() {
    return gulp.src([
            'bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
            'components/version/version.js',
            'components/version/version-directive.js',
            'components/version/interpolate-filter.js'
    ])
    .pipe(concat('other-resources.js'))    //concat all js files together (resources.js)
    .pipe(uglify())
    .pipe(gulp.dest('app/dist'));  //save in dist folder
});

//create gulp 'watch' task to sit and wait for changes to files, then run the tasks automatically
gulp.task('watch', function() {

    console.log("Running Watch...");

    //watch the less file for changes
    // gulp.watch('public/assets/css/style.less', ['css']); //2nd arg is array of tasks to run!

    //watch js files
    gulp.watch(['app/*.js', 'app/**/*.js', 'app/*.css'], //1st arg -> files to watch (array or single file)
        ['js', 'angular', 'minify-css']); //2nd arg -> tasks to run in order

});
