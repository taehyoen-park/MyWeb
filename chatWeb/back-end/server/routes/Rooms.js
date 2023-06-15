const express = require('express');
const session = require('../session/sessionConfig');
const roomController = require('../Controller/rooms');
const router = express.Router();


router.use(session)
router.post("/Chatroom/rooms",roomController);

module.exports = router;