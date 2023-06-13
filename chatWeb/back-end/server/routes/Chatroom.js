const session = require('../session/sessionConfig');
const mysql = require('mysql');
const router = require('./Register');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'chatm',
  password: 'Chatdb5389@',
  database: 'chatdb',
  port:'3306'
});

connection.connect();
router.use(session);
router.post("/Chatroom", (req, res) => {
    
    //req.session.data = "세션";
    //req.session.save();
    //console.log("session데이터",req.session);
    if (req.body.friend_id)
    {
        // friend_id가 존재하는 경우 -> 친구등록하기
        connection.query('SELECT * FROM users WHERE user_id=?',
            [req.body.friend_id],
            function (error, result, fields)
            {
                if(error) throw error;

                if(result.length === 0)
                    res.status(200).json({ message: '없는 아이디 입니다.', isSuccess: false });
                
                else
                {
                    connection.query('SELECT * FROM friends WHERE user_id=? and friend_id=?',
                    [req.body.user_id,req.body.friend_id],
                    function (error2, result2, fields2)
                    {
                        if (error2) throw error2;

                        if(result2.length > 0)
                            res.status(200).json({ message: '이미 등록된 아이디 입니다.', isSuccess: false });
                        
                        else
                        {
                            connection.query('INSERT INTO friends (user_id, friend_id, friend_name) VALUES (?, ?, ?)',
                                [req.body.user_id, req.body.friend_id, result[0].user_name],
                                function (error3, result3, fields3)
                                {
                                    if (error3) throw error3;
        
                                    res.status(200).json({ message: '친구 등록이 완료되었습니다.', isSuccess: true });
                                });
                        }
                    });
                }
            });  
    }
    
    else 
    {
        const currentUsers = req.body.currentUsers;
        //console.log(currentUsers);
        const values = currentUsers.map(element => `${element.user_name}`); 
         // 친구들중 접속하지 않은 경우 -> 친구 목록 가져오기
        connection.query('SELECT * FROM friends WHERE user_id=? and friend_name NOT IN (?)',
            [req.body.user_id,values],
            function (error, results, fields)
            {
                if (error) throw error;

                connection.query('SELECT * FROM friends WHERE user_id=? and friend_name IN (?)', 
                    [req.body.user_id,values],
                    function(error2, results2)
                    {
                        if (error) throw error;
    
                        const resultarr = [];
                        for(let i = 0; i < results.length; i++)
                        {
                            results[i].isOnline = false;
                            resultarr.push(results[i]);
                        }
                                  
                        for(let i = 0; i < results2.length; i++)
                        {
                            results2[i].isOnline = true;
                            const index = req.body.currentUsers.findIndex(user => user.user_name === results2[i].friend_name);
                            results2[i].server_socketId = req.body.currentUsers[index].server_socketId;
                            resultarr.push(results2[i]);
                        }
                            
                        res.status(200).send(resultarr);
                    });
            }); 
        }
  
  });

module.exports = router;