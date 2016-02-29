var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-log2console';

// IIFE
function generateIIFE(logText, options) {
    var useStrictLines = options.useStrict ? ["\"use strict\";", ""] : [];
    var prependedSemicolon = options.prependSemicolon ? ";" : "";

    var lines = [
        "",
        `${prependedSemicolon}(function() {`,
        ...useStrictLines,
        generateLogFunc(logText, options.logType),
        `}());`,
    ];
    return lines.join(options.trimCode ? "" : "\n");
}

// Logging
function generateLogFunc(logText, logType) {
    var escapedText = logText.replace("\"", "\\\"");
    switch (logType) {
        case 'log':
            return "window.console && console.log(\"" + escapedText + "\");";
        case 'info':
            return "window.console && console.info(\"" + escapedText + "\");";
        case 'warn':
            return "window.console && console.warn(\"" + escapedText + "\");";
        case 'error':
            return "window.console && console.error(\"" + escapedText + "\");";
        default:
            return "window.console && console.log(" + escapedText + ");";
    }
}

// Plugin
function gulpConsolelog(logText, opt) {
    var options = {
        logType: opt.logType || 'log',
        prependSemicolon: opt.prependSemicolon || false,
        useStrict: opt.useStrict || false,
        trimCode: opt.trimCode !== false ? true : false
    }

    if (!logText) {
        throw new PluginError(PLUGIN_NAME, 'Missing logging text');
    }

    logText = new Buffer(generateIIFE(logText, options));
    var jsFileRegex = new RegExp('\.(js|ts|coffee|litcoffee)$', 'i');

    var stream = through.obj(function (file, enc, cb) {
        if (!jsFileRegex.test(path.basename(file.path))) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'This file (' + file.path + ') is not a JS file!'));
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            file.contents = Buffer.concat([file.contents, logText]);
        }

        this.push(file);
        cb();
    });

    return stream;
};

module.exports = gulpConsolelog;