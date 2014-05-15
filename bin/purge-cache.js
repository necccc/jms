#!/usr/bin/env node

var paths          = require('../lib/paths');
var cachepurge     = require(paths.libdir + '/cachepurge');

function done (err) {
	if (err) {
		return process.exit(1);
	}

	return process.exit(0);
}


if (process.argv[2] && process.argv[3]) {
	cachepurge.deleteKeys(null, [process.argv[2]], [process.argv[3]], done);
} else if (process.argv[2] && !process.argv[3]) {
	cachepurge.deleteSource(null, [process.argv[2]], done);
} else {
	cachepurge.deleteAll(done);
}