"use strict";

class TrackingHand {
  constructor(device) {
    this.device = device;
  }

  start() {
    this.device.leapmotion.on("hand", function(hand) {
      console.log(hand);
    });
  }
}
module.exports = TrackingHand;
