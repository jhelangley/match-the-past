const { resetTestDB } = require('./config')
const app = require('../../app')
const request = require('supertest')

describe('Facts API endpoints', () => {
    beforeEach(async () => {
        await resetTestDB()
    })
    beforeAll(() => {
        api = app.listen(5001, () => {
            console.log('test server running on port 5001');
        })
    })
    afterAll((done) => {
        console.log('Gracefully stopping the test server');
        api.close(done)
    })

    describe('GET /events/random/:level', () => {
        it('should return random events with a status code of 200 ', async () => {
            const response = await request(app).get('/events/random/1')
            expect(response.statusCode).toBe(200)
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })
    })
})

describe('User API endpoints', () => {
    beforeEach(async () => {
        await resetTestDB()
    })

    describe('GET /users/students', () => {
        it('should return all students with a status code of 200 ', async () => {
            const response = await request(app).get('/users/students')
            expect(response.statusCode).toBe(200)
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })
    })

    describe('GET /users/:username', () => {
        it('should retreive a student username with a status code of 200 ', async () => {
            const response = await request(app).get('/users/username%201')
            expect(response.statusCode).toBe(200)
        })
    })

    describe('POST /register', () => {
        it('should create a new username and password', async () => {
            const newUser = {username: 'username1', password: 'password1', is_admin: false}
            const response = await request(app).post('/users/register').send(newUser)
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('username', 'username1')
            expect(response.body).toHaveProperty('password')
            expect(response.body.password).not.toBe('password1')
            expect(response.body).toHaveProperty('is_admin', false)
        })
        it('should return a 400 if required fields are missing', async () => {
            const incompleteUser = { username: 'username1'}
            const response = await request(app).post('/users/register').send(incompleteUser)
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('error')
        })
    })

        describe('POST /login', () => {
        it('should log in a user with correct username and password', async () => {
            await request(app).post('/users/register').send({username: 'username1', password: 'password1', is_admin: false})
            const user = {username: 'username1', password: 'password1', role: false}
            const response = await request(app).post('/users/login').send(user)
            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body).toHaveProperty('token')
            expect(response.body.username).toBe('username1')
        })
        it('should reject an incorrect password', async () => {
            const user = {username: 'username1', password: 'passwordWrong', is_admin: false} 
            await request(app).post('/users/register').send({username: 'username1', password: 'password1', is_admin: false})
            const response = await request(app).post('/users/login').send(user)
            expect(response.status).toBe(401)
            expect(response.body.error).toBe('User could not be authenticated')
        })
    })
})

