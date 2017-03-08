"use strict";

/**
 * @fileoverview Tracking Hand by Leap Motion
 * @copyright LeapMotion Developers Jp
 * @author smapira
 * @license MIT
 * @version 1.0.0
 * @see https://cylonjs.com/documentation/drivers/leapmotion/
 */

class TrackingHand {

  /**
   * constructor
   */
  constructor() {
    this.isStart = false;
  }
  /**
   * start()
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  configure(device) {
    this.isStart = !this.isStart;
    device.leapmotion.on("hand", function(hand) {
      console.log(hand);
    });
  }
}

module.exports = TrackingHand;
