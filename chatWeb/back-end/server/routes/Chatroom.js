const express = require('express');
const session = require('../session/sessionConfig');
const friendController = require('../Controller/friends');
const router = express.Router();


router.use(session);
router.post("/Chatroom",friendController);

module.exports = router;