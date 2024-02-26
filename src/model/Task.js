

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            isIn: [['todo', 'started', 'completed']],
        }
    }, { timestamps: true });
    return Task;
};