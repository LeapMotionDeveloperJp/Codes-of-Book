"use strict";

/**
 * @fileoverview Leap本用のCylonJsのヒナ型
 * @copyright LeapMotion Developers Jp
 * @author 
 * @license MIT
 * @version 1.0.0
 */
var Cylon = require("cylon");
var TrackingHand = require("./lib/tracking_hand");

Cylon.robot({
  connections: {
    leapmotion: { adaptor: "leapmotion" }
  },

  devices: {
    leapmotion: { driver: "leapmotion" }
  },
  work: function work(my) {
    new TrackingHand(my).start();
  }
}).start();