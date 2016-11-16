"use strict";

class TrackingHand {
  constructor(device) {
    this.device = device;
    this.isStart = false;
  }

  start() {
    this.device.leapmotion.on("hand", function(hand) {
      console.log(hand);
    });
  }
}
module.exports = TrackingHand;
