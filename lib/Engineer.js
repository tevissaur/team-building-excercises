const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
    }
}

Engineer.prototype.getGithub = function() {
    return this.github
}

Engineer.prototype.getRole = function() {
    return 'Engineer'
}

module.exports = Engineer
