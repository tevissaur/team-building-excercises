const Intern = require('../lib/Intern')

// Test employee
const testIntern = new Intern('Mr. Intern', 14, 'student@email.com', 'MSU')

describe('Intern Test', () => {
    it('Should return the Interns name', () => {
        const result = testIntern.getName()
        const expectedResult = 'Mr. Intern'

        expect(result).toBe(expectedResult)
    })

    it('Should return the Interns id number', () => {
        const result = testIntern.getId()
        const expectedResult = 14

        expect(result).toBe(expectedResult)
    })

    it('Should return the Interns email', () => {
        const result = testIntern.getEmail()
        const expectedResult = 'student@email.com'

        expect(result).toBe(expectedResult)
    })

    it('Should return the Interns school name', () => {
        const result = testIntern.getSchool()
        const expectedResult = 'MSU'

        expect(result).toBe(expectedResult)
    })

    it('Should return the Interns role', () => {
        const result = testIntern.getRole()
        const expectedResult = 'Intern'

        expect(result).toBe(expectedResult)
    })
})
