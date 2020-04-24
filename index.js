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
    name: "contributing",
    message: "How do we contribute to this project?",
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

async function init() {
  try {
    const promptData = await inquirer.prompt(questions);
    // readMeData object with all data from the prompt
    const readMeData = { ...promptData };
    // get user key from promptData
    const { username } = promptData;
    // axios request from api function
    const githubUser = await api.getUser(username);
    // take email and avatar_url from response of axios requesr
    const { email, avatar_url } = githubUser.data;
    // newReadMeData that has readMeData with added email and avatar
    const newReadMeData = {
      ...readMeData,
      email: email,
      avatar: avatar_url,
    };
    // append data to README.md file
    await writeToFile("README.md", newReadMeData);
  } catch (err) {
    // catch the error
    throw err;
  }
}

init();
