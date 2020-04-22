require("dotenv").config();
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const api = require("./utils/api");

const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "title",
    message: "What is your Project title?",
  },
  {
    type: "input",
    name: "description",
    message: "Describe your project",
  },
  {
    type: "checkbox",
    name: "tableOfContents",
    message: "What should be in your Table of Contents?",
    choices: [
      "Project Title",
      "Description",
      "Installation",
      "Usage",
      "Lisense",
      "Contributing",
      "Tests",
      "Questions",
    ],
  },
  {
    type: "input",
    name: "installation",
    message: "How do we install?",
  },
  {
    type: "input",
    name: "usage",
    message: "How do we use the project?",
  },
  {
    type: "input",
    name: "contributors",
    message: "Who are the contributors?",
  },
  {
    type: "input",
    name: "test",
    message: "How do we test?",
  },
];

function writeToFile(fileName, data) {
  fs.appendFile(fileName, data, (err) => console.log(err));
}

function init() {}

init();
