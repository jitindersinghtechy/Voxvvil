const express = require('express');
const router = express.Router();
const auth = require('./auth');
const branch = require('./branch');

router.use(auth);
router.use(branch);

module.exports = router;