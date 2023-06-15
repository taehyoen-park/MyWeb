const express = require('express');
const path = require('path');
const staticFilesPath = path.resolve(__dirname, '../../front-end/front/build');
const registerRouter = require('./routes/Register');
const loginRouter = require('./routes/login');
const chatroomRouter = require('./routes/Chatroom');
const roomRouter = require('./routes/Rooms');
const messageRouter = require('./routes/Messages');
const session = require('./session/sessionConfig');
const cors = require('cors');
const webSocket = require('./socket');
const app = express();


app.set('port', process.env.PORT || 8000);
app.use(express.static(staticFilesPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
        origin: true, // 클라이언트의 주소
        methods: ['GET', 'POST'], // 허용할 HTTP 메서드
        allowedHeaders: ['Content-Type'], // 허용할 헤더
        credentials:true
  }));

app.get('*',function(req,res){
    
    res.sendFile(path.join(__dirname,'../../front-end/front/build/index.html'));
})

app.use(session);
app.use(registerRouter);
app.use(loginRouter);
app.use(chatroomRouter);
app.use(roomRouter);
app.use(messageRouter);

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})

webSocket(server,app);

