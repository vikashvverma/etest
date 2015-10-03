/**
 * Created by Vikash on 3/10/15.
 */
'use strict';

var express = require('express');
var controller = require('./tcs.aptitude.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();
router.get('/', controller.index);

router.use(auth.isAuthenticated());

router.get('/:id', controller.fetch);
router.post('/', controller.create);
router.get('/stat/all',controller.getAllStatistics);
router.get('/stat/rank/:id',controller.getRankStatistics);
router.get('/stat/:id',controller.getStatistics);
//router.delete('/:id', controller.destroy);

module.exports = router;
