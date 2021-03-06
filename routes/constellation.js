var express = require('express');

var router = express.Router();

var Constellation = require('../models/constellation')

router.get('/', function(req, res, next) {
		Constellation.find().exec(function(err, constellations) {
			if( err ) {
				return res.status(500).json({
					title: 'Error',
					error: err
				})
			}
			res.status(200).json({
					message: 'Success',
					obj: constellations
			})
		})
})

module.exports = router;