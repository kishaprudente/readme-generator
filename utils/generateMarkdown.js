function generateMarkdown(data) {
  return `
# ${data.title}

### ${data.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation
    ${data.installation}

## Usage
#### run in the terminal
    ${data.usage}

## Tests
    ${data.test}

## Contributing
${data.contributing}

### Questions?
![Bio Image](${data.avatar}&s=50)

#### Email: ${data.email}

`;
}

module.exports = generateMarkdown;
