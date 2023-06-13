const session = require('../session/sessionConfig');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'chatm',
    password: 'Chatdb5389@',
    database: 'chatdb',
    port:'3306'
  });
  
connection.connect();

router.post("/Chatroom/rooms",(req, res) => {
   
    // 방 등록
    if(req.body.room_id)
    {
         const values = req.body.userList.map((id) => {
            return [id,req.body.room_id,req.body.isGroup]
         });
        //console.log("방만들기");
        connection.query('INSERT INTO rooms (user_id, room_id, isGroup) VALUES ? ',
            [values],
            function(error, result, fields)
            {
                if(error) throw error;
                res.status(200).json({ message: '방 생성이 완료되었습니다.', isSuccess: true,roomdata:req.body});

            });
    }

    // 방가져오기
    else
    {
        connection.query('SELECT * FROM rooms WHERE user_id=?',
            [req.body.user_id],
            function (error2, result2, fields2)
            {
                if(error2) throw error;
                // for(let i = 0; i < result2.length; i++)
                // {
                //     if(req.body.roomdata.room_id === result2[i].room_id)
                //         result2[i].friend_name = req.body.roomdata.friend_name; 
                    
                // }
                res.status(200).json({ message: '유저의 방을 모두가져오는데 성공했습니다.', isSuccess: true,roomdata:result2});
            });
    
                
                //res.status(200).json({ message: '유저의 방을 모두가져오는데 성공했습니다.', isSuccess: true,roomdata:result});
            
    }

});

module.exports = router;