var path = require ('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require ('sequelize');

var sequelize = new Sequelize (DB_name,user,pwd,
{
	dialect: protocol,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage,
	omitNull: true
});



//Usar BBDD SQLite
//var sequelize = new Sequelize (null, null, null, {dialect: 'sqlite',storage:'quiz.sqlite'});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; //Exportamos definicion de tabla Quiz.

var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Comment = Comment;

sequelize.sync().then(function(){ // Creamos e inicializamos la bbdd
	Quiz.count().then(function (count){
		if (count === 0) {
			Quiz.bulkCreate(
			[{pregunta: 'Capital de España',respuesta: 'Madrid',tematica: 'Humanidades'},
			{pregunta: 'Capital de Portugal',respuesta: 'Lisboa',tematica: 'Humanidades'}
			]).then(function(){console.log('Base de datos inicializada.')});
		};
	});
});