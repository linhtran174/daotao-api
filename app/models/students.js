var Sequelize = require('sequelize');

module.exports = function(sequelize) {

	var Teacher = sequelize.define('students', {
		stud_id: {
			type: Sequelize.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		stud_fname: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		stud_lname: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		stud_email: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		stud_pass: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		stud_phone: {
			type: Sequelize.STRING(50),
		},
		stud_bod:{
			type: Sequelize.DATE
		}
	}, {
		timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'tblTeacher'
		});

	return Teacher;
}