var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Alerta = require('../models').Alerta;

/* Recuperar os estabelecimentos de determinado usuario */
router.get('/recuperar/:idEstabelecimento', function(req, res, next) {
	
	var idEstabelecimento = req.params.idEstabelecimento;

	console.log(`Recuperando os alertas do estabelecimento do id ${idEstabelecimento}`);
	
	const instrucaoSql = `select distinct a.idAlerta,a.alerta,a.dataAlerta,a.fkMaquinaAlerta from alerta as a, 
						  kprMaquina as m, kprEstabelecimento as e where a.fkEstabelecimento = ${idEstabelecimento};`;
	sequelize.query(instrucaoSql, {
		model: Alerta,
		mapToModel: true
	  })
	  .then(resultado => {
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});

module.exports = router;