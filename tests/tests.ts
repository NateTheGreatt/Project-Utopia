/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/should.d.ts" />
/// <reference path="../d.ts/socket.io-client.d.ts" />

import io = require('socket.io-client');
import should = require('should');

[io,should]; // have to use "should" somewhere so the TS compiler doesn't strip the definition as an unused variable

var socketURL = 'https://project-utopia-c9-natethegreatt.c9.io';

var options = {
	transports: ['websocket'],
	'forceNew': true
};

var player1 = {id: 1234, name: "Jillian Sticky Arms", x: 5, y: 5};
var player2 = {id: 1235, name: "Steven Sloppy Slacks", x: 6, y: 6};

describe('game server', function() {
  this.timeout(5000);
	
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
		
		client1.on('connect', function(payload) {
			client1.emit('newPlayer', player1);
		});
		
		// this should match the server-side entity speed variable
		var speed = 5;
		
		// how many key presses we want to send
		var iterations = 5;
		
		for(var i=0;i<iterations;i++) {
			// send "key presses" to the server"
			client1.emit('movePlayer', {id: player1.id, directions: ['down', 'right']});
			
			// simulate client's coordinates (phaser will do this for us);
			player1.x += speed;
			player1.y += speed;
		}
		
		client1.on('player moved', function(payload) {
			// make sure we get back the same amount of packets that we sent
			iterations--;
			if(iterations == 0) {
				payload.x.should.equal(player1.x);
				payload.y.should.equal(player1.y);
				client1.disconnect();
				done();
			}
		});
		
	});
	
	it('should tell client about another player spawning', function(done) {
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