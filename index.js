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
  fs.writeFile(fileName, generateMarkdown(data), () => {
    console.log("README.md Generated!");
  });
}

function init() {
  inquirer
    .prompt(questions)
    .then((response) => {
      // readMeData object with all the response object from prompt
      const readMeData = { ...response };
      // axios request from api function
      api.getUser(response.username).then((res) => {
        // take email and avatar_url from response of axios requesr
        const { email, avatar_url } = res.data;
        // newReadMeData that has readMeData with added email and avatar
        const newReadMeData = {
          ...readMeData,
          email: email,
          avatar: avatar_url,
        };
        console.log(newReadMeData);
        // append data to README.md file
        writeToFile("README.md", newReadMeData);
      });
    })
    // catch the error
    .catch((err) => console.log(err));
}

init();
