var Sequelize = require('sequelize');
module.exports = function(sequelize) {

	var User = sequelize.define('users', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		pass: {
			type: Sequelize.STRING
		}
		}, {
			timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'tblUser'
	});

	return User;
}
