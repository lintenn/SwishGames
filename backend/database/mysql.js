const Sequelize = require('sequelize')

const { NODE_ENV } = process.env

const nameBBDD = NODE_ENV === 'test' ? 'u325099778_SwishGamesTest' : 'u325099778_SwishGames'

const mysql = new Sequelize(nameBBDD,nameBBDD,'SwishGames A A G L M 5',{
    host:'sql168.main-hosting.eu',
    dialect: 'mysql'
} )

module.exports = mysql
