#! /usr/bin/env node
const fs = require('fs')
const archiver = require('archiver')
const exec = require('child_process').execSync
const del = require('del');

const temp = fs.mkdtempSync('layer')
fs.copyFileSync('package.json', `${temp}/package.json`)
fs.copyFileSync('package-lock.json', `${temp}/package-lock.json`)
process.chdir(temp)
child = exec('npm install --production');

// create a file to stream archive data to.
const output = fs.createWriteStream( 'layer.zip');
const archive = archiver('zip', {
	zlib: { level: 9 } // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
	process.chdir('..')
	fs.copyFileSync(`${temp}/layer.zip`, 'layer.zip')
	del(temp);

	console.log(archive.pointer() + ' total bytes');
	console.log('AWS Lambda Layer file is ready.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
	console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
	if (err.code === 'ENOENT') {
		// log warning
	} else {
		// throw error
		throw err;
	}
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
	throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.directory('node_modules/', 'nodejs/node_modules', null);

archive.finalize();
