const express = require('express');
const router = express.Router();
const controller = require("../../controllers/branch");
const verifyToken = require('../../middleware/tokenVerify');
const roleChecker = require('../../middleware/roleChecker');

router.post('/api/branch', verifyToken, roleChecker(["admin"]), controller.post);
router.get('/api/branch', verifyToken, roleChecker(["admin"]), controller.get);
router.put('/api/branch', verifyToken, roleChecker(["admin"]), controller.put);
router.delete('/api/branch/:id', verifyToken, roleChecker(["admin"]), controller.delete);

module.exports = router;