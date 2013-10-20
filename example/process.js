#!/usr/bin/env node
module.exports = {
	main: main
};

function main() {
	var exec = require('child_process').exec;
	var fs = require('fs');
	var cov, lib, code;

	fs.readFile('original.json', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		cov = JSON.parse(data);
		lines = Object.keys(cov.s).length;
		fs.readFile('lib.js', 'utf8', function(err, code) {
			for (var i=1; i<=lines; i++) {
				if (cov.s[i] >= "1") {
					console.log("keep statement " + i);
				} else {
					console.log("delete statement " + i);
					code = comment_bad_code(i, code);
				}
			}
			fs.writeFileSync('lib2.js', code);
		});
	});

	function comment_bad_code(statement, data) {
		var map = cov.statementMap;
		var start = map[statement].start;
		var end = map[statement].end;
		var code = comment(start.line - 1, start.column, end.line - 1, end.column, data);
		return code;
	}

	function comment(s_line_no, s_column_no, e_line_no, e_column_no, data) {
		var lines = data.split(/\n/);
		if(s_line_no < lines.length && e_line_no < lines.length) {
			if (s_line_no == e_line_no) {
				e_column_no += 4;
			}
			line = lines[s_line_no];
			prev = line.substr(0, s_column_no);
			rest = line.substr(s_column_no);
			lines[s_line_no] = prev + " /* " + rest;

			line = lines[e_line_no];
			prev = line.substr(0, e_column_no);
			rest = line.substr(e_column_no);
			lines[e_line_no] = prev + " */ " + rest;
			code = lines.join("\n");
		}
		return code;
	}

}