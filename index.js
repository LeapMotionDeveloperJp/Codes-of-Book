"use strict";

/**
 * @fileoverview Leap本用のCylonJsのヒナ型
 * @copyright LeapMotion Developers Jp
 * @author
 * @license MIT
 * @version 1.0.0
 */

var chalk = require("chalk");
var clear = require("clear");
var CLI = require("clui");
var figlet = require("figlet");
var inquirer = require("inquirer");
var Cylon = require("cylon");
var TrackingHand = require("./lib/tracking_hand");

clear();
console.log(
  chalk.yellow(
    figlet.textSync("LeapMotion Developers Jp", {horizontalLayout: "default"})
  )
);

inquirer.prompt([
  {
    type: "list",
    name: "size",
    message: "Which chapter no do you run",
    choices: ["ch0", "ch1", "ch2"],
    filter: function (val) {
      return val.toLowerCase();
    }
  }
], function(answers) {
  console.log(JSON.stringify(answers, null, "  "));
}).then(function(response){
  console.log(response.size);
  switch (response.size) {
    case "ch2":
      break;
    default:
      runCylon();
      break;
  }
});

function runCylon() {
  Cylon.robot({
    connections: {
      leapmotion: {adaptor: "leapmotion"}
    },
    devices: {
      leapmotion: {driver: "leapmotion"}
    },
    work: function work(my) {
      new TrackingHand(my).start();
    }
  }).start();
}