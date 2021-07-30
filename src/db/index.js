const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite:./model/Contact.db')

sequelize.define('Contact', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVaccinated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

sequelize.sync()

module.exports = {
    db: sequelize,
    connect: sequelize.authenticate(),
}