exports.question = function(req,res){
	res.render('quizes/question',{pregunta:'Capital de España'})
};

exports.answer = function(req,res){
	if(req.query.respuesta === 'Madrid'){
		res.render('quizes/answer',{respuesta:'Respuesta correcta.'});
	}else {
		res.render('quizes/answer',{respuesta:'Respuesta incorrecta. Vuelva a intentarlo.'});
	}
};