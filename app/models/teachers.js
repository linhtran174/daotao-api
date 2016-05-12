var Sequelize = require('sequelize');

module.exports = function(sequelize) {

	var Teacher = sequelize.define('teachers', {
		teacher_id: {
			type: Sequelize.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		teacher_fname: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		teacher_lname: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		teacher_email: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		teacher_pass: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		teacher_phone: {
			type: Sequelize.STRING(50),
		}
	}, {
		timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'tblTeacher'
		});

	return Teacher;
}