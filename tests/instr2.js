if (typeof __coverage__ === 'undefined') {
    __coverage__ = {};
}
if (!__coverage__['/Users/razzi/fb/goldmine/tests/simple.js']) {
    __coverage__['/Users/razzi/fb/goldmine/tests/simple.js'] = {
        "path": "/Users/razzi/fb/goldmine/tests/simple.js",
        "s": {
            "1": 1,
            "2": 0,
            "3": 0
        },
        "b": {},
        "f": {
            "1": 0
        },
        "fnMap": {
            "1": {
                "name": "hi",
                "line": 1,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": -15
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            }
        },
        "statementMap": {
            "1": {
                "start": {
                    "line": 1,
                    "column": -15
                },
                "end": {
                    "line": 3,
                    "column": 1
                }
            },
            "2": {
                "start": {
                    "line": 2,
                    "column": 1
                },
                "end": {
                    "line": 2,
                    "column": 16
                }
            },
            "3": {
                "start": {
                    "line": 4,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 5
                }
            }
        },
        "branchMap": {}
    };
}
var coverage = __coverage__['/Users/razzi/fb/goldmine/tests/simple.js'];

function hi() {
    coverage.f['1']++;
    coverage.s['2']++;
    return 'hello';
}
coverage.s['3']++;
hi();
var str = JSON.stringify(coverage);
var fs = require('fs');
fs.writeFile("results", str, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});