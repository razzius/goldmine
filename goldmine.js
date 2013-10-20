#!/usr/bin/env node
var argv = require('optimist')
    .usage('Count the lines in a file.\nUsage: $0')
    .demand(['t', 'c','l'])
    .alias('t', 'tests').alias('c','code').alias('l','lib')
    .describe('t', 'js test file').describe('c', 'code file').describe('l', 'library to be trimmed')
    .argv
;

console.log(argv.lib);
