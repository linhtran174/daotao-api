var Sequelize = require('sequelize');

module.exports = function(sequelize){
	var Lessons = sequelize.define('lessons',{
		lesson_id: {
			type: Sequelize.BIGINT(20).UNSIGNED,
			//allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		lesson_name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		lesson_topicId: {
			type: Sequelize.BIGINT(20).UNSIGNED,
		},
		lesson_desc: {
			type: Sequelize.TEXT,
		},
		lesson_video: {
			type: Sequelize.STRING(500)
		},
		lesson_mate:{
			type: Sequelize.STRING(500)
		},
		lesson_type:{
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1
		},
		lesson_time: {
			type: Sequelize.DATE
		}
	},{
		timestamps: false,
		freezeTableName: true,
		tableName: 'tblLesson'
	},{
		classMethods: {
			associate: function(models){
				Lesson.belongsTo(models.Topic, {foreignKey: 'lesson_topicId', targetKey: 'topic_id' });
			}
		}
	});

	return Lessons;
}