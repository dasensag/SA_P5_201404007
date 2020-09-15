const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zipper', function(){
    return gulp.src('src/*')
        .pipe(zip('client.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('zipper'));