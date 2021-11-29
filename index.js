const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./models/Employee");
const Engineer = require("./models/Engineer");
const Intern = require("./models/Intern");
const Manager = require("./models/Manager");

let team = [];

const questions = [
  {
    type: "input",
    message: "Please enter employee name: ",
    name: "name"
  },
  {
    type: "input",
    message: "Please enter employee email address: ",
    name: "email"
  },
  {
    type: "input",
    message: "Please enter employee ID: ",
    name: "id"
  },
  {
    type: "list",
    message: "Please select job title (role): ",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"]
  }
];

function addAdtl() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "addEmployee",
      }
    ])
    .then(response => {
      if (response.addEmployee === true) {
        init(team)
      } else {
        generateHtml()
      }
    })
};

function init() {
  inquirer
    .prompt(questions)
    .then(answers => {
      if (answers.role === "Manager") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Please enter office number: ",
              name: "office"
            }
          ])
          .then(response => {
            const TeamManager = new Manager(answers.name, answers.id, answers.email, answers.role, response.office)
            team.push(TeamManager)
            addAdtl()
          });
      } else if (answers.role === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Please enter GitHub username: ",
              name: "github"
            }
          ])
          .then(response => {
            const EngineerOnTeam = new Engineer(answers.name, answers.id, answers.email, answers.role, response.github)
            team.push(EngineerOnTeam)
            addAdtl()
          });
      } else if (answers.role === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Please enter school name: ",
              name: "school"
            }
          ])
          .then(response => {
            const InternOnTeam = new Intern(answers.name, answers.id, answers.email, answers.role, response.school)
            team.push(InternOnTeam)
            addAdtl()
          })
      } else {
        return
      }
    })
};

function managerCard(data) {
  return `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h3 id="employee-name" class="card-title">${data.name}</h3>
      <h5 id="employee-role" class="card-subtitle">${data.role}</h5>
      <p id="employee-id" class="card-text">Employee ID: ${data.id}</p>
      <p id="employee-office" class="card-text">Office: ${data.office}</p>
      <p id="employee-email" class="card-text"><a href="mailto:${data.email}">Email: ${data.email}</a>
    </div>
  </div>`
}
function engineerCard(data) {
  return `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h3 id="employee-name" class="card-title">${data.name}</h3>
      <h5 id="employee-role" class="card-subtitle">${data.role}</h5>
      <p id="employee-id" class="card-text">Employee ID: ${data.id}</p>
      <p id="employee-github" class="card-text">GitHub: ${data.github}</p>
      <p id="employee-email" class="card-text"><a href="mailto:${data.email}">Email: ${data.email}</a>
    </div>
  </div>`
}
function internCard(data) {
  return `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h3 id="employee-name" class="card-title">${data.name}</h3>
      <h5 id="employee-role" class="card-subtitle">${data.role}</h5>
      <p id="employee-id" class="card-text">Employee ID: ${data.id}</p>
      <p id="employee-school" class="card-text">School: ${data.school}</p>
      <p id="employee-email" class="card-text"><a href="mailto:${data.email}">Email: ${data.email}</a>
    </div>
  </div>`
}

function generateHtml(role) {

  let builtHtmlCards = ''

  for (let index = 0; index < team.length; index++) {
    const employee = team[index];
    console.log(employee)
    if (employee.role === "Manager") {
      builtHtmlCards += managerCard(employee)
    } else if (employee.role === "Engineer") {
      builtHtmlCards += engineerCard(employee)
    } else if (employee.role === "Intern") {
      builtHtmlCards += internCard(employee)
    }
  }

  const finalHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      <link rel="stylesheet" type="text/css" href="./index.css">
      <title>Team Profile</title>
    </head>
    <body>
      <header class="container-fliud">
        <nav class="navbar navbar-dark bg-info justify-content-center">
          <h1>Team Profile</h1>
        </nav>
      </header>
      <main>
        <div class="container-fluid row col-12">
            <div class="card-deck container-fluid row" id="deck">
              ${builtHtmlCards}
            </div>
        </div>
      </main>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </body>
    </html>`
  writeFinalHtml(finalHtml);
};

function writeFinalHtml(finalHtml) {
  fs.writeFile("./index.html", finalHtml, err => {
      err ? console.log("Error... Something went wrong.") : console.log("Successfully generated index.html file!");
  })
};

init();
    


