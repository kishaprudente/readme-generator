function generateMarkdown(data) {
  return `
# ${data.title}

### ${data.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Tests](#test)

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
