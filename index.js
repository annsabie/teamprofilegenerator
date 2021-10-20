const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([
        {
        type: "input",
        message: "What is the team manager's name?",
        name: "managername",   
        },
        {
        type: "input",
        message: "What is the team manager's employee id?",
        name: "managerid",   
        },
        {
        type: "input",
        message: "What is the team manager's email address?",
        name: "manageremail",
        },
        {
        type: "input",
        message: "What is the team manager's office number?",
        name: "manageroffice",
        },
        {
        type: "list",
        message: "Please choose member role.",
        choices: ["Engineer", "Intern"],
        name: "role"
        },
        {
        type: "input",
        message: "What is the member's name?",
        name: "membername",
        },
        {
        type: "input",
        message: "What is the member's id number?",
        name: "memberid",
        },
        {
        type: "input",
        message: "What is the member's email address?",
        name: "memberemail",
        },
        {
        type: "input",
        message: "What is the member's GitHub username?",
        name: "memberGithub",
        },
        {
        type: "input",
        message: "What is the intern's school?",
        name: "school",
        when: (input) => input.role === "Intern",
        },
        {
        type: "confirm",
        message: "Would you like to add another member?",
        name: "confirmadd",
        },
        
    ]) 

    .then((response) => {
        const managerName = response.managername
        const managerId = response.managerid
        const managerEmail = response.manageremail
        const managerOffice = response.manageroffice
        const memberRole = response.role
        const memberName = response.membername 
        const memberID = response.memberid 
        const memberEmail = response.memberemail 
        const memberGithub = response.memberGithub
        const memberSchool = response.school

        const teamProfile = `<!DOCTYPE HTML>
        <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>portfolio</title>
    <link rel='stylesheet' href='./style.css'/>
</head>
<body>
    <header>
        <h1>${managerName}</h1>
        <h2>${managerId}</h2>
        <h3>${managerEmail}</h3>
        <h4>${managerOffice}
        <img src="./images/ET.png">
    </header>

    <div>
        <h3>ABOUT ME</h3>
        <p class='bio'>${memberRole}</p>
        <p class='bio'>${memberName}</p>
        <p class='bio'>${memberID}</p>
        <p class='bio'>${memberEmail}</p>
        <p class='bio'>${memberGithub}</p>
        <p class='bio'>${memberSchool}</p>
    </div>

    <footer>
    </footer>
</body>
</html>`


fs.writeFile("index.html", teamProfile, err => {
    err ? console.log("oops") : console.log("yay")
})
    })
  





    


