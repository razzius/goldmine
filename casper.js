var casper = require('casper').create();


casper.test.begin("title test", 1, function(test) {
	casper.start("http://localhost:8000", function() {
		title = this.evaluate(function() {
			return document.title;
		});
		console.log(title + " and " + this.getCurrentUrl());
	});
	casper.then(function() {
		test.assertTitle("test");
		test.done();
	});
});

casper.run();
