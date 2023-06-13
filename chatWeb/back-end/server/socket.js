const sessionMiddleware = require('./session/sessionConfig');
const sharedSession = require("express-socket.io-session");
const mysql = require('mysql');
let connectedUsers = [];
let currentRooms = [];
let roomMessages = {};
let sessions = {};


const saveMessage = (messageData) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'chatm',
        password: 'Chatdb5389@',
        database: 'chatdb',
        port:'3306'
    });
    connection.connect();

    //const values = messageData.map(obj => [obj.room_id, obj.message, obj.from_id, obj.to_id, obj.date])
    const val = messageData;
    //console.log(values);
    const Query = "INSERT INTO singlelog (room_id, message, from_id, to_id, date) VALUES (?, ?, ?, ?, ?) ";
    connection.query(Query,
        [val.room_id,val.message,val.from_id,val.to_id,val.data],
        function(error, result, fields)
        {
            if(error) throw error;
        });
}
module.exports = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000', // 클라이언트의 주소
            methods: ['GET', 'POST'], // 허용할 HTTP 메서드
            allowedHeaders: ['my-custom-header'], // 허용할 커스텀 헤더
            credentials: true // 인증정보 (쿠키 등) 전송 여부
        }
    });
    io.use(sharedSession(sessionMiddleware, { autoSave:true }));


    io.on('connection', (socket) => {
        console.log("연결성공");
        
        socket.on('on', (user_name,user_id,socketId) => {
            const session = socket.handshake.session;
            let check = false;
            session.user_name = user_name;
            session.user_id = user_id;
            session.socketId = socketId;
            const connectedUser = {
                user_name: user_name,
                user_id:user_id,
                isOnline: true,
                server_socketId: socket.id 
            };

            for(let i = 0; i < connectedUsers.length; i++)
            {
                if(connectedUsers[i].user_name !== connectedUser.user_name) continue;
                else check = true;
            }
            if(!check){
                connectedUsers.push(connectedUser);
                sessions[user_id] = socketId;
                //console.log("유저 클라이언트 소켓 아이디",sessions[user_id]);
            } 
            io.emit('on', connectedUsers,currentRooms);
        });

        socket.on('addfriend', () => {
            socket.emit('addfriend', connectedUsers);
        });

        socket.on('addroom', (roomdata) => {
            console.log(roomdata.length);
            for(let i = 0; i < roomdata.userList.length; i++)
            {
                roomdata.userid = roomdata.userList[i];
                currentRooms.push(roomdata);
                io.to(sessions[roomdata.userList[i]]).emit('addroom',roomdata);
                io.to(sessions[roomdata.userList[i]]).emit('join',roomdata);
            }
        });

        //특정 클라이언트에게 메시지를 받았을 때 현제 메시지만 저장
        socket.on('message', (messageData) => 
        {
            saveMessage(messageData);
            io.to(messageData.room_id).emit('message',messageData);
        });

        socket.on('join',(roomId,username) => {
            console.log(username,"조인",roomId,"로");
            socket.join(roomId);
        });

        socket.on('disconnect', () => {
            const session = socket.handshake.session;
            console.log("연결 끊김");
            connectedUsers = connectedUsers.filter(user => user.user_name !== session.user_name);
            console.log("유저 이름",session.user_name);
            io.emit('disconnected',connectedUsers);
            delete sessions[session.user_id];
            delete session.socketId;
            delete session.user_id;
            delete session.user_name;
        });

    });
}


    // io.use((socket, next) => {
    //     const session = socket.request.session;
    //     console.log(session.isLoggedIn);
    //     if (session && session.isLoggedIn) {
    //       next();
    //     } else {
    //       next(new Error('Unauthorized'));
    //     }
    //   });
      