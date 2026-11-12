const Fact = require('../models/Event.js')
const db = require('../database/connect')

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