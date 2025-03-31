const dbConfig = require("../database/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
	pool: {
	max: dbConfig.pool.max,
	min: dbConfig.pool.min,
	acquire: dbConfig.pool.acquire,
	idle: dbConfig.pool.idle
	}
});

const db = {}
db.sequelize = sequelize;
db.models = {}
db.models.User = require("./UserModel")(sequelize, Sequelize.DataTypes)
db.models.Property = require("./PropertyModel")(sequelize, Sequelize.DataTypes)
db.models.UtilityBill = require("./UtilityModel")(sequelize, Sequelize.DataTypes)

module.exports = db;

