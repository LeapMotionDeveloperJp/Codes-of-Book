"use strict";
require("../node_modules/leapjs/template/entry");
require("console.table");

/**
 * @fileoverview Tracking Hand by Leap Motion for Robot arm
 * @copyright LeapMotion Developers Jp
 * @author smapira
 * @license MIT
 * @version 1.0.0
 * @see https://cylonjs.com/documentation/drivers/leapmotion/
 */

const NORMALIZE_PITCH = 60;
const OPEN_SCISSORS = 180;
const CLOSE_SCISSORS = -300;

class HandlingRobotArm {

  /**
   * constructor
   */
  constructor() {
    this.isStart = false;
    this.isGrab = false;
  }

  /**
   * start()
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  start(device) {
    this.isStart = !this.isStart;
    HandlingRobotArm.workingServo2(device);
    HandlingRobotArm.workingServo3(device);
    HandlingRobotArm.workingServo4(device);
    HandlingRobotArm.workingServo5(device);
    HandlingRobotArm.workingServo6(device);
    HandlingRobotArm.workingServo7(device);
    this.workingServo8(device, false);
    device.leapmotion.on("frame", function(frame) {
      if (frame.hands.length < 1) {
        return;
      }
      let hand = frame.hands[0];
      let average = HandlingRobotArm
        .avgHandPosition(new Leap.Controller(), hand, 30);
      let rotate = HandlingRobotArm.normalizeRotate(average[0]);
      let height = HandlingRobotArm.normalizeHeight(average[1]);
      let depth = HandlingRobotArm.normalizeDepth(average[2]);

      if (device.servo2.currentAngle() == rotate
        && device.servo4.currentAngle() == height
        && device.servo5.currentAngle() == depth) {
        return;
      }
      console.table(average);
      console.log("Rotate Angle: " + rotate);
      console.log("Depth Angle: " + depth);
      console.log("Height Angle: " + height);
      console.log("Grab: " + (hand.grabStrength == 1));

      if (device.servo2.currentAngle() != rotate) {
        device.servo2.angle(rotate);
      }
      if (device.servo4.currentAngle() != depth) {
        device.servo4.angle(depth);
      }
      if (device.servo5.currentAngle() != height) {
        device.servo5.angle(height);
      }
      if (this.isGrab == (hand.grabStrength == 1)) {
        return;
      }
      this.isGrab = !this.isGrab;
      if (this.isGrab) {
        device.servo7.angle(OPEN_SCISSORS);
      } else {
        device.servo7.angle(CLOSE_SCISSORS);
      }
    });
  }

  /**
   * workingServo2() Rotate
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  static workingServo2(device) {
    device.servo2.angle(150);
  }

  /**
   * workingServo3()
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  static workingServo3(device) {
    device.servo3.angle(60);
  }

  /**
   * workingServo4()
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  static workingServo4(device) {
    device.servo4.angle(40);
  }

  /**
   * workingServo5() Depth
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  static workingServo5(device) {
    device.servo5.angle(90);
  }

  /**
   * workingServo6() Height
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  static workingServo6(device) {
    device.servo6.angle(290);
  }

  /**
   * workingServo7()
   * @param {Object} [device] object containing device information for the Robot
   * @returns {void}
   */
  static workingServo7(device) {
    device.servo7.angle(CLOSE_SCISSORS);
  }

  /**
   * workingServo8()
   * @param {Object} [device] object containing device information for the Robot
   * @param {Boolean} [value] is Grab ?
   * @returns {void}
   */
  workingServo8(device, value) {
    if (this.isGrab != value) {
      this.isGrab = value;
      if (this.isGrab) {
        device.servo8.angle(OPEN_SCISSORS);
      } else {
        device.servo8.angle(CLOSE_SCISSORS);
      }
    }
  }

  /**
   * normalizeRotate()
   * @param {Number} [angle] Left -300 Right 300
   * @returns {Number} 10 steps for servo2.write(300)
   */
  static normalizeRotate(angle) {
    let scale = 30;
    return Math.round((angle + 300) / NORMALIZE_PITCH) * scale;
  }

  /**
   * normalizeHeight()
   * @param {Number} [angle] Height 0 600
   * @returns {Number} 10 steps servo4.write(80);
   */
  static normalizeHeight(angle) {
    let scale = 8;
    return Math.round(angle / NORMALIZE_PITCH) * scale;
  }

  /**
   * normalizeDepth()
   * @param {Number} [angle]  Depth -120 300
   * @returns {Number} 10 steps servo5.write(120);
   */
  static normalizeDepth(angle) {
    let scale = 12;
    return 90 - (Math.round((angle + 120) / NORMALIZE_PITCH) * scale);
  }


  /**
   * avgHandPosition()
   * @param {Object} [controller] object
   * @param {Object} [hand] object
   * @param {Object} [historySamples] object
   * @returns {Object} 0: Width 1: Height 2:  Depth 300 -120
   */
  static avgHandPosition(controller, hand, historySamples) {
    let sum = Leap.vec3.create();
    Leap.vec3.copy(sum, hand.palmPosition);
    let sequence;
    for (sequence = 1; sequence < historySamples; sequence++) {
      let oldHand = controller.frame(sequence).hand(hand.id);
      if (!oldHand.valid) break;
      Leap.vec3.add(sum, oldHand.palmPosition, sum);
    }
    Leap.vec3.scale(sum, sum, 1 / sequence);
    return sum;
  }
}

module.exports = HandlingRobotArm;
