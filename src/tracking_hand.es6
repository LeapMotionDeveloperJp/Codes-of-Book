"use strict";

/**
 * @fileoverview Tracking Hand by Leap Motion
 * @copyright LeapMotion Developers Jp
 * @author K90j1
 * @license MIT
 * @version 1.0.0
 */

class TrackingHand {

  /**
   * constructor
   * @param {Object} [device] object containing device information for the Robot
   */
  constructor(device) {
    this.device = device;
    this.isStart = false;
  }

  /**
   * start()
   * @returns {void}
   */
  start() {
    this.isStart = true;
    this.device.leapmotion.on("hand", function(hand) {
      console.log(hand);
    });
  }
}
module.exports = TrackingHand;
