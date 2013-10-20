#!/usr/bin/env node

var fs = require("fs");

fs.readFile("lib2.js", "utf8", function(error, data) {
	var length = data.length;
	console.log(length);
	var depth = 0;
	for (var i = 0; i < length; i++) {
		if (data.charAt(i) == "/" && data.charAt(i+1) == "*") {
			if (depth === 0) {
				depth++;
			} else {
				depth++;
				prev = data.substring(0, i);
				rest = data.substring(i+2);
				data = prev + rest;
			}
		} else if (data.charAt(i) == "*" && data.charAt(i+1) == "/") {
			if (depth === 1) {
				depth = 0;
			} else {
				prev = data.substring(0, i);
				rest = data.substring(i+2);
				data = prev + rest;
				depth--;
			}
		}
	}
	fs.writeFileSync("lib2.js", data);
});
