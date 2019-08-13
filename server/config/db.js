const Sequelize = require('sequelize').Sequelize;

module.exports = new Sequelize('mern', 'root', '',{
    host: 'localhost', 
    dialect:'mysql'
});