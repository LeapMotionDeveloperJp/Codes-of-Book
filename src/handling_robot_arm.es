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
const OPEN_SCISSORS = 0;
const CLOSE_SCISSORS = 300;

class HandlingRobotArm {

  /**
   * constructor
   */
  constructor() {
    this.isStart = false;
    this.currentX = 0;
    this.currentY = 0;
    this.currentZ = 0;
    this.isGrab = false;
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
    this.workingServo3();
    this.workingServo4();
    this.workingServo5();
    this.workingServo6();
    this.workingServo7();
    this.workingServo8(false);
    device.leapmotion.on("frame", function (frame) {
      if (frame.hands.length > 0) {
        let hand = frame.hands[0];
        let average = HandlingRobotArm
          .avgHandPosition(new Leap.Controller(), hand, 30);
        console.table(average);
        this.workingServo3(average[0]);
        this.workingServo6(average[1]);
        this.workingServo8(hand.fingers.length > 0);
      }
    });
  }

  /**
   * workingServo3() Rotate
   * @param {Number} [value] hand x axis position
   * @returns {void}
   */
  workingServo3(value) {
    let angle = HandlingRobotArm.normalizeRotate(value);
    if (this.currentX != angle) {
      this.currentX = angle;
      this.device.servo3.angle(this.currentX);
    }
  }

  /**
   * workingServo4()
   * @returns {void}
   */
  workingServo4() {
    this.device.servo4.angle(80);
  }

  /**
   * workingServo5() Depth
   * @returns {void}
   */
  workingServo5() {
    this.device.servo5.angle(40);
  }

  /**
   * workingServo6() Height
   * @param {Number} [value] hand y axis position
   * @returns {void}
   */
  workingServo6(value) {
    let angle = HandlingRobotArm.normalizeHeight(value);
    if (this.currentY != angle) {
      this.currentY = angle;
      this.device.servo6.angle(this.currentY);
    }
  }

  /**
   * workingServo7()
   * @returns {void}
   */
  workingServo7() {
    this.device.servo7.angle(290);
  }

  /**
   * workingServo8()
   * @param {Boolean} [value] is Grab ?
   * @returns {void}
   */
  workingServo8(value) {
    if (this.isGrab != value) {
      this.isGrab = value;
      if (this.isGrab) {
        this.device.servo8.angle(OPEN_SCISSORS);
      } else {
        this.device.servo8.angle(CLOSE_SCISSORS);
      }
    }
  }

  /**
   * normalizeRotate()
   * @param {Number} [rotate] Left -300 Right 300
   * @returns {Number} 10 steps for servo2.write(300)
   */
  static normalizeRotate(rotate) {
    let scale = 30;
    return rotate / NORMALIZE_PITCH * scale;
  }

  /**
   * normalizeHeight()
   * @param {Number} [angle] Height 0 600
   * @returns {Number} 10 steps servo5.write(120);
   */
  static normalizeHeight(angle) {
    let scale = 12;
    return angle / NORMALIZE_PITCH * scale;
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
