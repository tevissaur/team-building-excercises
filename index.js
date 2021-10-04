const inquirer = require('inquirer')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const fs = require('fs')

// Creates the card
const createCard = (employee) => {
    if (employee.officeNumber) {
        uniqueRoleHTML = `Office Number: ${employee.officeNumber}`

    } else if (employee.github) {
        uniqueRoleHTML = `GitHub: <a href="https://github.com/${employee.github}">${employee.github}</a>`
        
    } else {
        uniqueRoleHTML = `School: ${employee.school}`

    }
    return `\n<section class="card col-3 m-2 p-0">
    <div class="card-header">
        <h2>
            ${employee.name}
        </h2>
        <p>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge-fill" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
                  </svg>
            </span>
            ${employee.getRole()}
        </p>

    </div>
    <ul class="list-group">
        <li class="list-group-item">ID: ${employee.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
        
        <li class="list-group-item">${uniqueRoleHTML}</li>
    </ul>
</section>\n`
}

// Creates HTML file, sets base HTML, calls createCard() for every employee and closes the HTML
const buildHTML = (employees) => {
    let baseHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <title>Document</title>
    </head>
    <body>
    <nav>
        <h1>My Team</h1>
    </nav>
    <div class="container row justify-content-center m-auto">`
    let card

    fs.writeFileSync('./dist/index.html', baseHTML, () => console.log('HTML file generated'))

    for (let employee of employees) {

        let employeeRole = employee.getRole()

        switch (employeeRole) {
            case 'Manager':
                card = createCard(employee)
                break
            case 'Engineer':
                card = createCard(employee)
                break
            case 'Intern':
                card = createCard(employee)
        }


        fs.appendFileSync('./dist/index.html', card)
        console.log(`${employee.name} has been added to the webpage`)

    }

    fs.appendFileSync('./dist/index.html', `    </div>\n</body>\n</html>`)
    console.log('Webpage is complete')
}

// Question to get the number of people on the team
const start = async () => {

    const howMany = {
        type: 'number',
        name: 'numEmployees',
        message: 'How many people are on your team?'
    }

    inquirer.prompt(howMany)
        .then(({ numEmployees }) => {
            main(numEmployees)
        })
}

// Instantiates the questions and starts the questions
const init = async () => {
    const questions = [
        {
            type: 'rawlist',
            name: 'employeeRole',
            message: 'What role is this employee in?',
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'employeeName',
            message: "What is the employee's name?"
        },
        {
            type: 'number',
            name: 'employeeId',
            message: "What is the employee's id number?",
            filter: input => typeof input === 'number' ? input : null
        },
        {
            type: 'input',
            name: 'employeeEmail',
            message: "What is the employee's email?",
            filter: input => input === /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ? null : input
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "What school is the intern studying?",
            when: ({ employeeRole }) => employeeRole === 'Intern'
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: "What is the manager's office number?",
            filter: input => typeof input === 'number' ? input : null,
            when: ({ employeeRole }) => employeeRole === 'Manager'
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: "What is the engineer's github username?",
            when: ({ employeeRole }) => employeeRole === 'Engineer'
        }
    ]
    return inquirer.prompt(questions)
}

// Creates the employee objects
const main = async (num) => {
    let employees = []

    for (num; num > 0; num--) {
        await init()
            .then(({ employeeRole, employeeName, employeeId, employeeEmail, officeNumber, githubUsername, internSchool }) => {
                switch (employeeRole) {
                    case 'Manager':
                        employees.push(new Manager(employeeName, employeeId, employeeEmail, officeNumber))
                        break
                    case 'Engineer':
                        employees.push(new Engineer(employeeName, employeeId, employeeEmail, githubUsername))

                        break
                    case 'Intern':
                        employees.push(new Intern(employeeName, employeeId, employeeEmail, internSchool))
                }
            })
    }
    buildHTML(employees)

}

start()
