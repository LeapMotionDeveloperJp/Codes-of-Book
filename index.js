"use strict";

/**
 * @fileoverview CUI for Run a Samples
 * @copyright LeapMotion Developers Jp
 * @author K90j1
 * @license MIT
 * @version 1.0.0
 */

var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var inquirer = require("inquirer");
var Cylon = require("cylon");
var TrackingHand = require("./lib/tracking_hand");
var ControllingServo = require("./lib/controlling_servo");

clear();
console.log(
  chalk.yellow(
    figlet.textSync("LeapMotion Developers Jp", {horizontalLayout: "default"})
  )
);
inquirer.prompt([
  {
    type: "list",
    name: "number",
    message: "Which chapter do you run",
    choices: ["ch0", "ch1", "ch2", "ch3",
      "ch4", "ch5", "ch6", "ch7", "ch8", "ch9"]
  }
], function(answers) {
  console.log(JSON.stringify(answers, null, "  "));
}).then(function(response) {
  switch (response.number) {
  case "ch2":
    console.log(response.number);
    break;
  default:
    runCylon(TrackingHand);
    break;
  }
});

var TrackingHand = {
  connections: {
    leapmotion: {adaptor: "leapmotion"}
  },
  devices: {
    leapmotion: {driver: "leapmotion"}
  },
  work: function(my) {
    // new TrackingHand().start(my);
    new ControllingServo().start(my);
  }
};

function runCylon(structure) {
  Cylon.robot(structure).start();
}