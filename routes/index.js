var express = require('express');
var router = express.Router();
var quizController = requier('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QUIZ rediseñado.' });
});

router.get('/author',function(req,res,next){
	res.render('author',{title: 'APARTADO DE DATOS DEL AUTOR.'})
});

router.get('/quizes/question',quizController.question);
router.get('/quizes/answer',quizController.answer);

module.exports = router;
