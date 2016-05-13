var Sequelize = require('sequelize');

module.exports = function(sequelize){
	var Courses = sequelize.define('courses',{
		course_id: {
			type: Sequelize.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		course_name: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		course_desc: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		course_shortDesc:{
			type: Sequelize.STRING(500),
			allowNull: false
		},
		course_title:{
			type: Sequelize.STRING(500)
		},
		course_totalTime: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		course_teacher: {
			type: Sequelize.BIGINT
		},
		course_level: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		course_type: {
			type: Sequelize.BIGINT,
		},
		course_createAt: {
			type: Sequelize.DATE,
			allowNull: false
		},
		course_startAt: {
			type: Sequelize.DATE,
			allowNull: false
		},
		course_video: {
			type: Sequelize.STRING(100)
		},
		course_fee:{
			type: Sequelize.FLOAT,
			defaultValue: 0
		},
		course_forum: {
			type: Sequelize.STRING(500),
		},
		course_cate: {
			type: Sequelize.BIGINT
		},
		course_rate: {
			type: Sequelize.INTEGER,
			defaultValue: 100
		}
	},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: 'tblCourse'
	},
	{
		classMethods: {
			associate: function(models){
				Courses.belongsTo(models.Teacher, {foreignKey: 'course_teacher', targetKey: 'teacher_id'});
			}
		}
	});

	return Courses;
}