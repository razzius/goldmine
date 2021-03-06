#!/usr/bin/env node
// var argv = require('optimist')
//     .usage('Count the lines in a file.\nUsage: $0')
//     .demand(['t', 'c','l'])
//     .alias('t', 'tests').alias('c','code').alias('l','lib')
//     .describe('t', 'js test file').describe('c', 'code file').describe('l', 'library to be trimmed')
//     .argv
// ;

// console.log(argv.lib);

var exec = require('child_process').exec;
var fs = require('fs');
// read the library
var lib, code;
fs.readFile('lib.js', 'utf8', function(err, data) {
	if (err) {
		return console.log(err);
	}
	var lib = data;
	fs.readFile('simple.js', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var code = data;
		var combined = lib + "'*END*'\n" + code;
		fs.writeFile("combined.js", combined, function(err) {
			if(err) {
				console.log(err);
			}
		});
	});
});


exec('istanbul instrument combined.js', function(error, stdout, stderr) {
	if (error !== null) {
		console.log("Failed to instrument combined javascript file");
	} else {
		var inst = stdout;
		var data = inst.replace(/__cov_[\$\w]+/g, "coverage");
		var code = [
			'var str = JSON.stringify(coverage);',
			'var fs = require("fs");',
			'fs.writeFile("coverage.json", str, function(err) {',
			'    if(err) {',
			'        console.log(err);',
			'    } else {',
			'        console.log("The file was saved!");',
			'    }',
			'});'
		].join("\n");
		data += code;
		fs.writeFile("instrumented.js", data, function(err) {
			if(err) {
				console.log(err);
			}
			exec('js-beautify instrumented.js', function(error, stdout, stderr) {
				console.log("Instrumented target library");
				fs.writeFile("beautiful.js", stdout, function(err) {
					if(err) {
						console.log(err);
					}
				});
				console.log("Made instrumented code readable");
				exec('node beautiful.js', function(error, stdout, stderr) {
					console.log('Running tests:');
					console.log(error, stdout, stderr);
					exec('js-beautify coverage.json', function(error, stdout, stderr) {
						fs.writeFile("coverage.json", stdout);
						parse_instrumented_code();
					});
				});
			});
		});
	}
});

function parse_instrumented_code() {
	fs.readFile("beautiful.js", 'utf8', function(err, data) {
		json = data;
		for (var i = 0; i < 4; i++) {
			json = json.substring(json.indexOf("{") + 1);
		}
		// find this brace's closing bracket
		var stack = ["{", "{"];
		index = 0;
		while (stack.length > 0) {
			if(json.charAt(index) == "{") {
				stack.push("{");
			} else if (json.charAt(index) == "}"){
				stack.pop();
			}
			index++;
		}
		index--;
		//remove from last ; to end
		json = "{" + json.substring(0, index);
		semicolon_char = json.lastIndexOf(";");
		console.log("Trimming coverage report at " + semicolon_char);
		json = json.substring(0, semicolon_char);
		fs.writeFile("original.json", json, function() {
			var process = require("./process");
			process.main();
		});
	});
}

function nth_occurrence (string, char, nth) {
	var first_index = string.indexOf(char);
	var length_up_to_first_index = first_index + 1;
	if (nth == 1) {
		return first_index;
	} else {
		var string_after_first_occurrence = string.slice(length_up_to_first_index);
		var next_occurrence = nth_occurrence(string_after_first_occurrence, char, nth - 1);
		if (next_occurrence === -1) {
			return -1;
		} else {
			return length_up_to_first_index + next_occurrence;
		}
	}
}

