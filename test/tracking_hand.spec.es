"use strict";

let chai = require("chai"),
  path = require("path"),
  sinon = require("sinon"),
  TrackingHand = require(path.join(__dirname, "../src", "tracking_hand.es6"));
var expect = chai.expect;

/** @test {TrackingHand} */
describe("Tracking Hand", () => {
  describe("#Start", () => {
    var trackingHand;
    const device = {};
    beforeEach(() => {
      device.leapmotion = {};
      device.leapmotion.on = function() {};
      trackingHand = new TrackingHand();
    });

    /** @test {TrackingHand#constructor()} */
    it("return before status", () => {
      expect(trackingHand.isStart).to.equal(false);
    });

    /** @test {TrackingHand#start()} */
    it("can be changed", () => {
      var spy = sinon.spy(trackingHand, "start");
      trackingHand.start(device);
      expect(spy.withArgs(device).calledOnce).to.equal(true);
      expect(trackingHand.isStart).to.equal(true);
    });
  });
});