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
   */
  constructor() {
    this.isStart = false;
  }
  /**
   * start()
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  start(device) {
    this.isStart = true;
    device.on("hand", function(hand) {
      console.log(hand);
    });
  }
}

module.exports = TrackingHand;
