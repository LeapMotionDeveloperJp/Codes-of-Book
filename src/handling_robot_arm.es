"use strict";

/**
 * @fileoverview Tracking Hand by Leap Motion for Robot arm
 * @copyright LeapMotion Developers Jp
 * @author smapira
 * @license MIT
 * @version 1.0.0
 * @see https://cylonjs.com/documentation/drivers/leapmotion/
 */

class HandlingRobotArm {

  /**
   * constructor
   */
  constructor() {
    this.isStart = false;
    this.currentX = 0;
    this.currentY = 0;
    this.currentZ = 0;
    this.device = null;
  }

  /**
   * start()
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  start(device) {
    this.isStart = !this.isStart;
    this.device = device;
    device.leapmotion.on("frame", function(frame) {
      if (frame.hands.length < 1) {
        return;
      }
      let hand = frame.hands[0];
      let position = hand.palmPosition;
      let velocity = hand.palmVelocity;
      let direction = hand.direction;
      let average = TrackingHand.avgHandPosition(hand, 30);
      console.table(average);

      if (currentX == 0) {
        this.workServo1(device, 10);
      }
    });
  }

  /**
   * start()
   * @param {Object} [hand] object containing device information for the Robot
   * @param {Object} [historySamples] object containing device information for the Robot
   * @returns {void}
   */
  static avgHandPosition(hand, historySamples) {
    let sum = Leap.vec3.create();
    Leap.vec3.copy(sum, hand.palmPosition);
    for (let s = 1; s < historySamples; s++) {
      let oldHand = controller.frame(s).hand(hand.id);
      if (!oldHand.valid) break;
      Leap.vec3.add(sum, oldHand.palmPosition, sum);
    }
    Leap.vec3.scale(sum, sum, 1 / s);
    return sum;
  }

  /**
   * workServo1()
   * @param {Object} [value] object containing device information for the Robot
   * @returns {void}
   */
  workServo1(value) {
    let angle = 45;
    this.device.servo.angle(angle);
    // every((1).second(), function () {
    //   angle = angle + 45;
    //   if (angle > 135) {
    //     angle = 45
    //   }
    //   device.servo.angle(angle);
    // });
  }

  /**
   * workServo2()
   * @param {Object} [value] object containing device information for the Robot
   * @returns {void}
   */
  workServo2(value) {
    let angle = 45;
    this.device.servo.angle(angle);
    // every((1).second(), function () {
    //   angle = angle + 45;
    //   if (angle > 135) {
    //     angle = 45
    //   }
    //   device.servo.angle(angle);
    // });
  }

  /**
   * workServo3()
   * @param {Object} [value] object containing device information for the Robot
   * @returns {void}
   */
  workServo3(value) {
    let angle = 45;
    this.device.servo.angle(angle);
    // every((1).second(), function () {
    //   angle = angle + 45;
    //   if (angle > 135) {
    //     angle = 45
    //   }
    //   device.servo.angle(angle);
    // });
  }

  /**
   * workServo4()
   * @param {Object} [value] object containing device information for the Robot
   * @returns {void}
   */
  workServo4(value) {
    let angle = 45;
    this.device.servo.angle(angle);
    // every((1).second(), function () {
    //   angle = angle + 45;
    //   if (angle > 135) {
    //     angle = 45
    //   }
    //   device.servo.angle(angle);
    // });
  }


}

module.exports = HandlingRobotArm;
