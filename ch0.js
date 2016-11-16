'use strict';

var Cylon = require('cylon');
var TrackingHand = require('./lib/tracking_hand');

Cylon.robot({
	connections: {
		leapmotion: { adaptor: 'leapmotion' }
	},

	devices: {
		leapmotion: { driver: 'leapmotion' }
	},
	work: function work(my) {
		new TrackingHand(my).start();
	}
}).start();