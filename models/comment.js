//Tabla para comentarios.

module.exports = function (sequelize,DataTypes){
	return sequelize.define(
		'Comment',
		{
			texto:{
				type: DataTypes.STRING,
				validate: {notEmpty: {msg:"Es necesario introducir comentario."}}
			},
			publicado:{
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		}
		);
}