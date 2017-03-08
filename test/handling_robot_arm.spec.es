"use strict";

let chai = require("chai"),
  path = require("path"),
  sinon = require("sinon"),
  HandlingRobotArm = require(path.join(__dirname, "../src", "handling_robot_arm"));
var expect = chai.expect;

/** @test {TrackingHand} */
describe("Handling Robot Arm", () => {
  describe("#Start", () => {
    var handlingRobotArm;
    const device = {};
    beforeEach(() => {
      device.leapmotion = {};
      device.leapmotion.on = function() {};
      device.servo2 = {};
      device.servo2.angle = function() {};
      device.servo3 = {};
      device.servo3.angle = function() {};
      device.servo4 = {};
      device.servo4.angle = function() {};
      device.servo5 = {};
      device.servo5.angle = function() {};
      device.servo6 = {};
      device.servo6.angle = function() {};
      device.servo7 = {};
      device.servo7.angle = function() {};
      device.servo8 = {};
      device.servo8.angle = function() {};
      handlingRobotArm = new HandlingRobotArm();
    });

    /** @test {TrackingHand#constructor()} */
    it("return before status", () => {
      expect(handlingRobotArm.isStart).to.equal(false);
    });

    /** @test {TrackingHand#start()} */
    it("can be changed", () => {
      var spy = sinon.spy(handlingRobotArm, "start");
      handlingRobotArm.start(device);
      expect(spy.withArgs(device).calledOnce).to.equal(true);
      expect(handlingRobotArm.isStart).to.equal(true);
    });
  });
});