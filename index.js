// Dependencies
require("dotenv").config();
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

// list of questions for readme generator
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

// write the data to the readme file
function writeToFile(fileName, data) {
  //generate markdown here
  const generatedReadMe = generateMarkdown(data);
  fs.appendFile(fileName, generatedReadMe, (err) => {
    console.log(generatedReadMe);
    console.log("README.md Generated!");
  });
}

function init() {
  inquirer
    .prompt(questions)
    .then((response) => {
      const readMeData = { ...response };
      api.getUser(response.username).then((res) => {
        const { email, avatar_url } = res.data;
        const newReadMeData = {
          ...readMeData,
          email: email,
          avatar: avatar_url,
        };
        console.log(newReadMeData);
        writeToFile("README.md", JSON.stringify(newReadMeData, null, 2));
      });
    })
    .catch((err) => console.log(err));
}

init();
