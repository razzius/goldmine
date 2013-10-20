var casper = require('casper').create();


casper.test.begin("Create email form", 1, function(test) {
	casper.start("http://localhost:8000", function() {
		this.click("#tab4");
		test.assert(this.visible("input"));
		test.done();
	});
});

casper.test.begin("Toggle green block", 1, function(test) {
	casper.start("http://localhost:8000", function() {
		this.click(".box");
		test.assert(this.visible("input"));
		test.done();
	});
});


casper.run();
