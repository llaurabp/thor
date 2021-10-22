const express = require('express');

const router = express.Router();

router.use('/secondpage', require('./gastosRoutes'));
router.use('/auth', require('./userRoutes'));

module.exports = router;