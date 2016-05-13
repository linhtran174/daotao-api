// var Student = require('./student');
// var Teacher = require('./teacher');
var Sequelize = require('sequelize');

module.exports = function(sequelize) {

	var Schedule = sequelize.define('schedules', {
		schedule_id: {
			type: Sequelize.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		schedule_teacher: {
			type: Sequelize.BIGINT.UNSIGNED,
			allowNull: false
		},
		schedule_datetime: {
			type: Sequelize.DATE,
			allowNull: false
		},
		schedule_student: {
			type: Sequelize.BIGINT.UNSIGNED,
			defaultValue: null
		},
		schedule_desc: {
			type: Sequelize.TEXT,
			defaultValue: null
		}
	}, {
		timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'tblSchedule'
		});
	// Schedule.belongsTo(Student, {foreignKey: 'schedule_student', targetKey: 'stud_id'});
	// Schedule.belongsTo(Teacher, {foreignKey: 'schedule_teacher', targetKey: 'teacher_id'});

	return Schedule;
}