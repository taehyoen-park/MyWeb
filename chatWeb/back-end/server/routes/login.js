const express = require('express');
const router = express.Router();
const loginController = require('../Controller/login');
const session = require('../session/sessionConfig');


router.use(session);
router.post('/',loginController);

module.exports = router;
