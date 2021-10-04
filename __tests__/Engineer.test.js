const Engineer = require('../lib/Engineer')

// Test employee
const testEngineer = new Engineer('Mr. Engineer', 13, 'smartdude@email.com', 'supersmartguy')

describe('Engineer Test', () => {
    it('Should return the engineers name', () => {
        const result = testEngineer.getName()
        const expectedResult = 'Mr. Engineer'

        expect(result).toBe(expectedResult)
    })

    it('Should return the engineers id number', () => {
        const result = testEngineer.getId()
        const expectedResult = 13

        expect(result).toBe(expectedResult)
    })

    it('Should return the engineers email', () => {
        const result = testEngineer.getEmail()
        const expectedResult = 'smartdude@email.com'

        expect(result).toBe(expectedResult)
    })

    it('Should return the engineers github username', () => {
        const result = testEngineer.getGithub()
        const expectedResult = 'supersmartguy'

        expect(result).toBe(expectedResult)
    })

    it('Should return the engineers role', () => {
        const result = testEngineer.getRole()
        const expectedResult = 'Engineer'

        expect(result).toBe(expectedResult)
    })
})
