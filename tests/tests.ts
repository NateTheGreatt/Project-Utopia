/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/should.d.ts" />
/// <reference path="../d.ts/socket.io-client.d.ts" />

import io = require('socket.io-client');
import should = require('should');

[io,should]; // have to use "should" somewhere so the TS compiler doesn't strip it as an unused variable

var socketURL = 'https://project-utopia-c9-natethegreatt.c9.io';

var options = {
	transports: ['websocket'],
	'forceNew': true
};

var player1 = {id: 1234, name: "Jillian Sticky Arms", x: 5, y: 5};
var player2 = {id: 1235, name: "Steven Sloppy Slacks", x: 6, y: 6};
		
describe('game server', function() {
  this.timeout(15000);
	
	it('should spawn player', function(done) {
		var client1 = io.connect(socketURL, options);
		
		client1.on('connect', function(payload) {
			client1.emit('newPlayer', player1);
		});
		
		client1.on('player joined', function(payload) {
			payload.should.have.property('name', player1.name);
			payload.should.have.property('id', player1.id);
			payload.should.have.property('x', player1.x);
			payload.should.have.property('y', player1.y);
			
			client1.disconnect();
			done();
		});
		
	});
	
	it('should move player', function(done) {
		var client1 = io.connect(socketURL, options);
		
		player1.x += 5;
		player1.y += 5;
		client1.emit('movePlayer', player1);
			
		client1.on('player moved', function(payload) {
			payload.x.should.eql(10);
			payload.y.should.eql(10);
			client1.disconnect();
			done();
		});
		
	});
	
	it('should show another player spawning', function(done) {
		var client1 = io.connect(socketURL, options);
		
		client1.on('connect', function(payload) {
			var client2 = io.connect(socketURL, options);
			client2.emit('newPlayer', player2);
			
			client1.on('player joined', function(payload) {
				payload.should.have.property('name', player2.name);
				client1.disconnect();
				client2.disconnect();
				done();
			});
			
		});
		
	});
	
});