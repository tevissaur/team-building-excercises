const inquirer = require('inquirer')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const fs = require('fs')


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
            filter: input => input === /\w+@\w+.\w+/ ? input : null
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


const getNumEmployees = async () => {

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

const buildHTML = ( employees ) => {
    let baseHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`
    let card

    fs.writeFile('./dist/index.html', '', () => console.log('HTML file generated'))

    for (let { employeeRole, employeeName, employeeId, employeeEmail, officeNumber, githubUsername, internSchool } of employees) {
        card = `    <section>
        <h2>
            ${employeeName}
        </h2>
        <p>
            ${employeeRole}
        </p>
        <ul>
            <li>${employeeId}</li>
            <li>Email: ${employeeEmail || ''}</li>
            <li>${officeNumber || githubUsername || internSchool}</li>
        </ul>
    </section>`
        fs.appendFile('./dist/index.html', JSON.stringify(card), () => console.log(`${employeeName} has been added to the webpage`))
        card = ''
    }
    fs.appendFile('./dist/index.html', `</body>
    </html>`, () => console.log('Webpage is complete'))
}

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

getNumEmployees()
