var Sequelize = require('sequelize');

module.exports = function(sequelize){
	var Topics = sequelize.define('topics',{
		topic_id: {
			type: Sequelize.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		topic_name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		topic_courseID:{
			type: Sequelize.STRING(50)
		},
		topic_desc:{
			type: Sequelize.TEXT,
		},
		topic_video:{
			type: Sequelize.STRING(500)
		}},
		{
			timestamps: false,
			freezeTableName: true,
			tableName: 'tblTopic'
		},
		{
			classMethods: {
				associate: function(models){
					Topic.belongTo(models.Course, {foreignKey:'topic_courseID', targetKey: 'topic_id'});
				}
			}
		});

	return Topics;
}