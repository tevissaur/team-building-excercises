const Employee = require('../lib/Employee')

// Test employee
const testEmployee = new Employee('name', 12, 'email@email.com')

describe('Employee Test', () => {
    it('Should return the employees name', () => {
        const result = testEmployee.getName()
        const expectedResult = 'name'

        expect(result).toBe(expectedResult)
    })
    it('Should return the employees id number', () => {
        const result = testEmployee.getId()
        const expectedResult = 12

        expect(result).toBe(expectedResult)
    })
    it('Should return the employees email', () => {
        const result = testEmployee.getEmail()
        const expectedResult = 'email@email.com'

        expect(result).toBe(expectedResult)
    })
    it('Should return the employees role', () => {
        const result = testEmployee.getRole()
        const expectedResult = 'Employee'

        expect(result).toBe(expectedResult)
    })
})
