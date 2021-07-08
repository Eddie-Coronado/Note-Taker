const router = require('express').Router();

const apiRoutes = require('./api-routes');
const HTMLRoutes = require('./html-routes');

router.use('/', HTMLRoutes);
router.use('/api', apiRoutes);

module.exports = router;