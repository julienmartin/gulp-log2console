var gulp = require('gulp');
var gulpLog2console = require('./index.js');

gulp.task('log2console', function () {
    gulp.src('dist/**/*.js')
        .pipe(gulpLog2console('prepend"sed string', { logType: 'warn', useStrict: true, trimCode: false, prependSemicolon: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['log2console']);