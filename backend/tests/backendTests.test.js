const mysql = require('../database/mysql')
const supertest = require('supertest')
const {app, server} = require('../app')

const api = supertest(app)

test('users are returned as json', async () => {
    await api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mysql.close()
    server.close()
})