var models = require ('../models/models.js');

exports.load = function (req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else {next(new Error('No existe quizId='+quiz.Id));}
		}
	).catch(function(error){next(error);});
};


exports.index = function(req,res){
	if (req.query.search === undefined){
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{
			quizes:quizes
		});
	})
	}else {
		models.Quiz.findAll({ where:["pregunta LIKE ?",'%'+req.query.search+'%']}).then(function(quizes){
			res.render('quizes/index.ejs',{quizes:quizes});
	})}
};

exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show.ejs',{quiz:req.quiz})
	})
};

/*exports.index = function(req, res) {
  models.Quiz.findAll().then(
  var search = '%';
  if(req.query.search){
    search = '%'+req.query.search+'%';
    search = search.replace(' ','%');
  }
  models.Quiz.findAll({where: ["pregunta like ?", '%'+req.query.search+'%']}).then(
     function(quizes) {
       res.render('quizes/index', { quizes: quizes});
     }
   ).catch(function(error) { next(error);})
 };*/

//GET /quizes/answer
exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
			if(req.query.respuesta === req.quiz.respuesta){
				res.render('quizes/answer.ejs',{quiz:req.quiz, respuesta:'Respuesta correcta.'});
			}else {
				res.render('quizes/answer.ejs',{quiz:req.quiz, respuesta:'Respuesta incorrecta. Vuelva a intentarlo.'});
			}
	})
};