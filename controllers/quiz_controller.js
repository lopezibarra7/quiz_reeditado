var models = require ('../models/models.js');

// Guardar los datos insertados en BD.
exports.create = function(req, res){
   var quiz = models.Quiz.build(req.body.quiz);
   				quiz.save({fields: ["pregunta", "respuesta", "tematica"]}).then(function(){
   					res.redirect('/quizes');
   		});
};

/* exports.create = function(req, res) {
   var quiz = models.Quiz.build( req.body.quiz );
  	quiz.validate().then(function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz
       .save({fields: ["pregunta","respuesta","tematica"]})
        .then( function(){ res.redirect('/quizes')}) 
      } 
    }
  );
}; */

exports.update = function (req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tematica = req.body.quiz.tematica;
		req.quiz.save({fields:['pregunta','respuesta','tematica']}).then(function(){res.redirect('/quizes');});
};

/*exports.update = function (req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tematica = req.body.quiz.tematica;
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit',{quiz:req.quiz,errors:err.errors});
		} else {
			req.quiz.save({fields:['pregunta','respuesta','tematica']})
			.then(function(){res.redirect('/quizes');});
		}
	});
};*/

exports.destroy = function(req,res){
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};

exports.edit = function(req,res){
	var quiz = req.quiz;
	res.render('quizes/edit',{quiz:quiz,errors:[]});
};

//GET /quizes/new
exports.new = function (req,res){
	var quiz = models.Quiz.build(
	{
		pregunta: '', respuesta: '', tematica: ''
	});
	res.render('quizes/new',{quiz:quiz,errors: []});
};

//GET /quizes/load
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

//GET /quizes/index
exports.index = function(req,res){
	if (req.query.search === undefined){
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes:quizes,errors:[]});
	})
	}else {
		models.Quiz.findAll({ where:["pregunta LIKE ?",'%'+req.query.search+'%']}).then(function(quizes){
			res.render('quizes/index.ejs',{quizes:quizes,errors:[]});
	})}
};

// GET /quizes/show
exports.show = function(req,res){
	res.render('quizes/show',{quiz: req.quiz,errors: []});
};


//GET /quizes/answer
exports.answer = function(req,res){
	var resultado = "Incorrecto";
	if(req.query.respuesta === req.quiz.respuesta) {
		resultado = "Correcto";
	}
	res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado,errors: []});
};