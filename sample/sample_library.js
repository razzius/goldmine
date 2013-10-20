function addThree (x) {
	return x + 3;
}

function multiplyAdd() {
	return 3 * addThree(3);
}

function happyString() {
	return "I'm happy!";
}

function flawedPowers(base, power) {
	for (var i = 0; i < power; i++) {
		base = base*base;
	}
	return base;
}

function listOfNames (name1, name2, name3) {
	var list = name1 + ", " + name2 + ", " + name3;
	return list;
}

function emotionListOfNames (emotion) {
	list = listOfNames("Becky", "Roger", "Dan");
	return list + " are " + emotion;
}

function factorial (n) {
	var product = 1;
	for (var i = 0; i < n; i++) {
		product = product * n;
		n--;
	}
}