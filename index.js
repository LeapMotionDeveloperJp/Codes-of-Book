"use strict";

/**
 * @fileoverview CUI for Run a Samples
 * @copyright LeapMotion Developers Jp
 * @author smapira
 * @license MIT
 * @version 1.0.0
 */

var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var inquirer = require("inquirer");
var Cylon = require("cylon");
var TrackingHand = require("./lib/tracking_hand");
var HandlingRobotArm = require("./lib/handling_robot_arm");
//const FIRMATA_PORT = "/dev/ttyACM0";
const FIRMATA_PORT = "COM4";

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
    message: "Which chapter do you run ?",
    choices: ["ch0", "ch1", "ch2", "ch3",
      "ch4", "ch5", "ch6", "ch7", "ch8", "ch9"]
  }
], function(answers) {
  console.log(JSON.stringify(answers, null, "  "));
}).then(function(response) {
  switch (response.number) {
  case "ch0":
    runCylon(handlingRobotArm);
    break;
  case "ch2":
    console.log(response.number);
    break;
  default:
    runCylon(trackingHand);
    break;
  }
});

var trackingHand = {
  connections: {
    leapmotion: {adaptor: "leapmotion"}
  },
  devices: {
    leapmotion: {driver: "leapmotion"}
  },
  work: function(my) {
    new TrackingHand().configure(my);
  }
};

var handlingRobotArm = {
  connections: {
    adaptor: {adaptor: 'firmata', port: FIRMATA_PORT},
    leap: {adaptor: "leapmotion"}
  },
  devices: {
    servo2: {driver: "servo", pin: 2},
    servo3: {driver: "servo", pin: 3},
    servo4: {driver: "servo", pin: 4},
    servo5: {driver: "servo", pin: 5},
    servo6: {driver: "servo", pin: 6},
    servo7: {driver: "servo", pin: 7},
    leapmotion: {driver: "leapmotion", connection: "leap"}
  },
  work: function(my) {
    new HandlingRobotArm().configure(my);
  }
};

function runCylon(structure) {
  Cylon.robot(structure).start();
}