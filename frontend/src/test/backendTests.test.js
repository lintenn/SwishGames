const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('users are returned as json', () => {
    api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})