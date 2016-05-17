var Sequelize = require('sequelize');
// var Student = require('./student');
// var Course = require('./course');

module.exports = function(sequelize) {

	var Classroom = sequelize.define('classrooms', {
		class_id: {
			type: Sequelize.BIGINT(20).UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		class_stud: {
			type: Sequelize.BIGINT(20).UNSIGNED,
			allowNull: false
		},
		class_course: {
			type: Sequelize.BIGINT(20).UNSIGNED,
			allowNull: false
		},
		class_comp: {
			type: Sequelize.INTEGER(11).UNSIGNED,
			allowNull: false,
			defaultValue: 0
		},
		class_joinedAt: {
			type: Sequelize.DATE,
			allowNull: false
		},
		class_lastAccess: {
			type: Sequelize.DATE,
			defaultValue: null
		},
		class_lessonComp: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		class_lesson: {
			type: Sequelize.BIGINT(20).UNSIGNED,
			allowNull: true,
			defaultValue: null
		},
		class_rate: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			defaultValue: null
		}
	},{
		timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'tblClassroom'
		});


	// Classroom.belongsTo(Course, {foreignKey: 'class_course', targetKey: 'course_id'});
	// Classroom.belongsTo(Student, {foreignKey: 'class_stud', targetKey: 'stud_id'});

	return Classroom;
}