const express = require('express');
const session = require('../session/sessionConfig');
const messageController = require('../Controller/messages');
const router = express.Router();


router.use(session)
router.post("/Chatroom/rooms/messages",messageController)

module.exports = router;