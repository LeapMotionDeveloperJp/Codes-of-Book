"use strict";

/**
 * Tracking Hand by Leap Motion
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
