const factController = require('../../controllers/events.js')
const Fact = require('../../models/Event.js')
const db = require('../../database/connect.js')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({
    send: mockSend,
    json: mockJson,
    end: mockEnd
}))
const mockRes = { status: mockStatus }
const mockReq = {params: {
    level: '1'
}}

describe('Fact', () => {
    it('Resolves with random facts on successful db query', async () => {
        const mockFacts = [
            {id: 1, title: 'a1', date: 1, description: 'a1'},
            {id: 2, title: 'a2', date: 2, description: 'a2'},
            {id: 3, title: 'a3', date: 3, description: 'a3'}
        ]

        const limit = 3

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockFacts });

      const facts = await Fact.getRandom()

    expect(facts).toHaveLength(3)
    expect(facts[0]).toHaveProperty('id');
    expect(facts[0].title).toBe('a1');
    expect(db.query).toHaveBeenCalledWith("SELECT * FROM (SELECT * FROM event_card ORDER BY RANDOM() LIMIT $1) AS random_events ORDER BY date ASC;", [undefined]);
    })
})

describe('Fact controllers', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('random', () => {
        it('should return a random fact with a status code 200', async () => {
            const testFact = ['f1', 'f2']
            jest.spyOn(Fact, 'getRandom').mockResolvedValue(testFact)
            await factController.random(mockReq, mockRes)
            expect(Fact.getRandom).toHaveBeenCalledTimes(1)
            expect(Fact.getRandom).toHaveBeenCalledWith(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testFact)
        })
    })
    it('should return an 500 error whenf failing', async () => {
        jest.spyOn(Fact, 'getRandom').mockRejectedValue(new Error('Something happened to your db'))
        await factController.random(mockReq, mockRes)
        expect(Fact.getRandom).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockJson).toHaveBeenCalledWith({error: 'Something happened to your db'})
    })

})