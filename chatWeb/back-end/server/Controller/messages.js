const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'chatm',
    password: 'Chatdb5389@',
    database: 'chatdb',
    port:'3306'
  });
connection.connect();

function messages(req,res)
{
    //console.log("내가 보고 싶었던 그것",s);
    // if(req.body.isSave)
    // {
    //     if(req.body.roomid !== undefined && req.body.messages.length > 0)
    //     {   
    //         const values = req.body.messages.map(obj => [obj.room_id, obj.message, obj.from_id, obj.to_id, obj.date])
    //         //console.log(values);
    //         const Query = "INSERT IGNORE INTO singlelog (room_id, message, from_id, to_id, date) VALUES ? ";
    //         connection.query(Query,
    //             [values],
    //             function(error, result, fields)
    //             {
    //                 if(error) throw error;
    //                 res.status(200).json({ message: '메시지를 모두저장하는데 성공했습니다.', isSuccess: true,data:req.body.messages});
    //             });
    //     }
    //     else
    //         res.status(200).json({ message: '저장할 메시지가 없습니다.', isSuccess: false});
    // }   
    // else
    {
        connection.query('SELECT * FROM singlelog WHERE room_id=? ORDER BY id ASC' ,
             [req.body.roomid],
             function(error, result, fields)
             {
                 if(error) throw error;
                 res.status(200).json({ message: '메시지를 모두가져오는데 성공했습니다.', isSuccess: true,messages:result});
 
             });
     }
}

module.exports = messages;