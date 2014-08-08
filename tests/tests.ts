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
		
		// make a randomized player here because if the server is running for more than one
		// test cycle this test won't pass, for the coordinates will have stacked up
		// on the server side but not here on the client (payload coordinates != player coordinates)
		var randomPlayer = {
			id: Math.floor(Math.random()*100), 
			name: 'bob', 
			x: Math.floor(Math.random()*100), 
			y: Math.floor(Math.random()*100)
		};
		
		client1.on('connect', function(payload) {
			client1.emit('newPlayer', randomPlayer);
		});
		
		// this should match the server-side entity speed variable
		var speed = 5;
		
		// how many key presses we want to send
		var iterations = 5;
		
		var movements = ['up','down','left','right'];
		var array = [];
		
		// generate random "key presses"
		for(var i=0;i<iterations;i++) {
			
			// get random direction from array
			var dirKey = Math.floor(Math.random()*3);
			
			// store key presses for later, after the server applies them
			array.push(movements[dirKey]);
			
			// send randomly generated key presses to server
			client1.emit('movePlayer', {id: randomPlayer.id, directions: [movements[dirKey]]});
		}
		client1.on('player moved', function(payload) {
			
			// make sure we get back the same amount of packets that we sent
			iterations--;
			// when all packets that were sent are recieved
			if(iterations == 0) {
				// simulate key presses here on the client-side to move player
				for(var i=0;i<array.length;i++) {
					if(array[i] == 'up') randomPlayer.y -= speed;
					if(array[i] == 'down') randomPlayer.y += speed;
					if(array[i] == 'left') randomPlayer.x -= speed;
					if(array[i] == 'right') randomPlayer.x += speed;
				}
				// check if the coordinates check out
				payload.x.should.equal(randomPlayer.x);
				payload.y.should.equal(randomPlayer.y);
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