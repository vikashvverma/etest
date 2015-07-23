'use strict';

var express = require('express');
var controller = require('./tcs.verbal.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.fetch);
//router.post('/', controller.create);
router.use(auth.isAuthenticated());
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
