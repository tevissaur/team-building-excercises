const inquirer = require('inquirer')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

let employees = []


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
            filter: input => typeof input === 'number' ? input : 'You did not enter a number.'
        },
        {
            type: 'input',
            name: 'employeeEmail',
            message: "What is the employee's email?",
            filter: input => input === /\w+@\w+\.\w+/ ? input : null
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

const main = async (num) => {

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
                console.log(employees[0])
            })
    }

}

getNumEmployees()
