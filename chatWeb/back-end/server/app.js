const express = require('express');
const registerRouter = require('./routes/Register');
const loginRouter = require('./routes/login');
const chatroomRouter = require('./routes/Chatroom');
const roomRouter = require('./routes/Rooms');
const messageRouter = require('./routes/Messages');
const path = require('path');
const session = require('./session/sessionConfig');
const staticFilesPath = path.resolve(__dirname, '../../front-end/front/build');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const webSocket = require('./socket');

app.set('port', process.env.PORT || 8000);
app.use(express.static(staticFilesPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session);

// app.use(session());
// app.use(session({
//     secret: 'pjb5289@',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//     }
// }));
app.get('*',function(req,res){
    
    res.sendFile(path.join(__dirname,'../../front-end/front/build/index.html'));
})
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트의 주소
    methods: ['GET', 'POST'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type'], // 허용할 헤더
  }));

app.use(loginRouter);
app.use(registerRouter);
app.use(chatroomRouter);
app.use(roomRouter);
app.use(messageRouter);

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})

webSocket(server);

