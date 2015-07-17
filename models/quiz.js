
module.exports = function (sequelize, DataTypes) {
	return sequelize.define ('Quiz',
		{ 
			pregunta:  {
				type: DataTypes.STRING,
				validate: {notEmpty:{msg: 'Introduzca pregunta por favor.'}}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: {notEmpty:{msg: 'Introduzca respuesta para la pregunta.'}}
			},
			tematica: {
				type: DataTypes.STRING,
				validate: {notEmpty:{msg: 'No ha seleccionado tematica.'}}
			}
		}
	);
}