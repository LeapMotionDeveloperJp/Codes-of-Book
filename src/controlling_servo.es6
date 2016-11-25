"use strict";

/**
 * @fileoverview Controlling Servo motor by Leap Motion
 * @copyright LeapMotion Developers Jp
 * @author K90j1
 * @license MIT
 * @version 1.0.0
 */

class ControllingServo {

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
    this.isStart = !this.isStart;
    device.on("frame", function(frame) {
      console.log(frame);
      exit(0);
    });
  }
}

module.exports = ControllingServo;
