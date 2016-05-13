var Sequelize = require('sequelize');

module.exports = function(sequelize) {

	var Category = sequelize.define('categories', {
		cate_id: {
			type: Sequelize.BIGINT(20).UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		cate_name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		cate_desc: {
			type: Sequelize.STRING(500),
			allowNull: true
		},
		cate_parent: {
			type: Sequelize.BIGINT(20).UNSIGNED,
			allowNull: true,
			defaultValue: 0
		}	
	},{
		timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'tblCategory'
		});

	return Category;
}