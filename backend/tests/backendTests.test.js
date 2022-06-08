const mysql = require('../database/mysql')
const supertest = require('supertest')

const {app, server} = require('../app')
const User = require('../models/UserModel.js')

const api = supertest(app)

const initialUsers = [
    {
        nombre: 'Angelino27',
        email: 'angelo@gmail.com',
        descripcion: 'Buenas',
        fecha_nacimiento: new Date(),
        fecha_creacion: new Date(),
        password: '12345',
        privacidad: null,
        imagen: 'https://static.diariosur.es/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--320x378.jpg',
        online: false
    },
    {
        nombre: 'galomax',
        email: 'galo@gmail.com',
        descripcion: 'Me encantan los videojuegos',
        fecha_nacimiento: new Date(),
        fecha_creacion: new Date(),
        password: '2222222',
        privacidad: null,
        imagen: 'https://static.diariosur.es/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--320x378.jpg',
        online: false
    }
]

beforeEach(async () => {
    await User.destroy({
        where: {}
    });

    await User.create( initialUsers[0] );
    await User.create( initialUsers[1] );
})

test('users are returned as json', async () => {
    await api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two users', async () => {
    const response = await api.get('/users')

    expect(response.body).toHaveLength(initialUsers.length)
})

test('first user has name Angelino27', async () => {
    const response = await api.get('/users')
    
    expect(response.body[0].nombre).toBe('Angelino27')
})

test('a valid user can be added', async () => {
    const newUser = {
        nombre: 'Pepito',
        email: 'pepito@gmail.com',
        descripcion: 'Hey',
        fecha_nacimiento: new Date(),
        fecha_creacion: new Date(),
        password: '55745anc',
        privacidad: null,
        imagen: 'https://static.diariosur.es/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--320x378.jpg',
        online: true
    }

    await api
        .post('/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/users')
        const contents = response.body.map(user => user.nombre)

        expect(response.body).toHaveLength(initialUsers.length + 1)
        expect(contents).toContain(newUser.nombre)
})

test('a user without name cannot be added', async () => {
    const newUser = {
        email: 'pepito@gmail.com',
        descripcion: 'Hey',
        fecha_nacimiento: new Date(),
        fecha_creacion: new Date(),
        password: '55745anc',
        privacidad: null,
        imagen: 'https://static.diariosur.es/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--320x378.jpg',
        online: true
    }

    await api
        .post('/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/users')

    expect(response.body).toHaveLength(initialUsers.length)
})

test('a user can be deleted', async () => {
    const firstResponse = await api.get('/users')
    const userToDelete = firstResponse.body[0]

    await api
        .delete(`/users/${userToDelete.id}`)
        .expect(204)

    const secondResponse = await api.get('/users')
    const contents = secondResponse.body.map(user => user.nombre)

    expect(secondResponse.body).toHaveLength(initialUsers.length - 1)
    expect(contents).not.toContain(userToDelete.nombre)
})

test('a user that do not exist cannot be deleted', async () => {
    await api
        .delete('/users/999999')
        .expect(400)

    const response = await api.get('/users')

    expect(response.body).toHaveLength(initialUsers.length)
})

afterAll(() => {
    mysql.close()
    server.close()
})