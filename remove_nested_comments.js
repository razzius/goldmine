#!/usr/bin/env node

var fs = require("fs");

fs.readFile("lib2.js", "utf8", function(error, data) {
	var start_comment = false;
	var closing_comment = false;
	var length = data.length;
	for (var i = 0; i < length; i++) {
		if (data.charAt(i) == "/" && data.charAt(i+1) == "*") {
			if (start_comment === false) {
				start_comment = true;
			} else {
				closing_comment = true;
				prev = data.substring(0, i);
				rest = data.substring(i+2);
				data = prev + rest;
			}
		}
		if (data.charAt(i) == "*" && data.charAt(i+1) == "/" && closing_comment === true) {
			closing_comment = false;
			prev = data.substring(0, i);
			rest = data.substring(i+2);
			data = prev + rest;
		}
	}
	console.log(data);
});
