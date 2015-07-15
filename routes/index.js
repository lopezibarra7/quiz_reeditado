var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QUIZ rediseñado.' });
});

router.param('quizId',quizController.load);

router.get('/author',function(req,res,next){
	res.render('author',{title: 'APARTADO DE DATOS DEL AUTOR.'})
});

router.get('/quizes',	quizController.index);
router.get('/quizes/:quizId(\\d+)',	quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);
router.get('/quizes/listado',quizController.listado);
/*router.get('/quizes/question',quizController.question);
router.get('/quizes/answer',quizController.answer);*/

module.exports = router;
