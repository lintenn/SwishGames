const Sequelize = require('sequelize')

const { SWISHGAMES_NAME, SWISHGAMES_TEST_NAME, NODE_ENV } = process.env

const nameBBDD = NODE_ENV === 'test' ? SWISHGAMES_TEST_NAME : SWISHGAMES_NAME

const mysql = new Sequelize(nameBBDD,nameBBDD,'SwishGames A A G L M 5',{
    host:'sql168.main-hosting.eu',
    dialect: 'mysql'
} )

module.exports = mysql
