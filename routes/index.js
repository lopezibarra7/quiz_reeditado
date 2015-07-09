var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QUIZ rediseñado' });
});

router.get('/author',function(req,res,next){
	res.render('author',{title: 'APARTADO DE DATOS DEL AUTOR'})
});

module.exports = router;
