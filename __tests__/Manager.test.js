const Manager = require('../lib/Manager')

// Test employee
const testManager = new Manager('Mr. Manager', 1, 'superimportantguy@email.com', 1)

describe('Manager Test', () => {
    it('Should return the Managers name', () => {
        const result = testManager.getName()
        const expectedResult = 'Mr. Manager'

        expect(result).toBe(expectedResult)
    })

    it('Should return the Managers id number', () => {
        const result = testManager.getId()
        const expectedResult = 1

        expect(result).toBe(expectedResult)
    })

    it('Should return the Managers email', () => {
        const result = testManager.getEmail()
        const expectedResult = 'superimportantguy@email.com'

        expect(result).toBe(expectedResult)
    })

    it('Should return the Managers office number', () => {
        const result = testManager.getOfficeNumber()
        const expectedResult = 1

        expect(result).toBe(expectedResult)
    })

    it('Should return the Managers role', () => {
        const result = testManager.getRole()
        const expectedResult = 'Manager'

        expect(result).toBe(expectedResult)
    })
})
