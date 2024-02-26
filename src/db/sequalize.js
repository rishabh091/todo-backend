const { Sequelize, DataTypes } = require('sequelize');
const { readdirSync } = require('fs');
const { join } = require('path');

const DB = process.env.DATABASE;
const sequelize = new Sequelize(DB);

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;

const modelPath = join(__dirname.replace('/db', ''), 'model');
const models = readdirSync(modelPath);
models.forEach(model => {
    const modelName = model.replace('.js', '');
    db[modelName] = require(join(modelPath, model))(sequelize, DataTypes);
});



module.exports = db;