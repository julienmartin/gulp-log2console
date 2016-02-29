# gulp-log2console

gulp-log2console is a [gulp](https://github.com/wearefractal/gulp) plugin which add console logging into your JS files.

[![NPM](https://nodei.co/npm/gulp-log2console.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-log2console/)

[![build status](https://secure.travis-ci.org/julienmartin/gulp-log2console.svg)](http://travis-ci.org/julienmartin/gulp-log2console)
[![devDependency Status](https://david-dm.org/julienmartin/gulp-log2console/dev-status.svg)](https://david-dm.org/julienmartin/gulp-log2console#info=devDependencies)

## Usage

```javascript
var log2console = require('gulp-log2console');

gulp.task('log2console', function () {
    gulp.src('dist/**/*.js')
        .pipe(log2console('My custom message', { logType: 'warn', useStrict: true, trimCode: false, prependSemicolon: true }))
        .pipe(gulp.dest('dist'));
});
```

## Options

* logType (string) : type of logging - (log (default), info, warn, error)
* useStrict (bool) : add 'use strict' into the IIFE function (default false)
* trimCode (bool) : inline code (default true)
* prependSemicolon (bool) : add a semicolon before the IIFE (default false)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
