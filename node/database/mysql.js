const Sequelize = require('sequelize')

const mysql = new Sequelize('u325099778_SwishGames','u325099778_SwishGames','SwishGames A A G L M 5',{
    host:'sql168.main-hosting.eu',
    dialect: 'mysql'
} )

module.exports = mysql
