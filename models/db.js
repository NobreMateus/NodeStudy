const Sequelize = require('sequelize');

//Conexao Mysql
const sequelize = new Sequelize('blogapp', 'root', 'Banco123',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}