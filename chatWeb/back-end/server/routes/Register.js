const express = require('express');
const router = express.Router();
const registerController = require('../Controller/register');
const session = require('../session/sessionConfig');


router.use(session)
router.post("/Register",registerController);

module.exports = router;