const express = require('express');
const session = require('../session/sessionConfig');
const router = express.Router();
const util = require("util");
const crypto = require('crypto');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'chatm',
    password: 'Chatdb5389@',
    database: 'chatdb',
    port:'3306'
});

connection.connect();
router.use(session);
//비밀번호 검증
const verifyPassword = async (password, userSalt, userPassword) => {
    const key = await pbkdf2Promise(password, userSalt, 104906, 64, "sha512");
    const hashedPassword = key.toString("base64");
    
    if ( hashedPassword === userPassword ) return true;
    else return false;
  };

router.post('/', async (req,res) => {
    req.session.a = 1;
    req.session.save();
    let verify;
    connection.query('select * from chatdb.users WHERE user_id=?',
        req.body.userid,
        function(error,result,fields)
        {
            if(error) throw error;
            if (result.length > 0) 
            {
                const user = result[0];
                verify = verifyPassword(req.body.password, user.user_salt, user.user_password);
                const sessionId = uuidv4();
                verify.then((response) => {
                    if (response) {
                      // 세션 데이터 저장
                      req.session.sessionId = sessionId;
                      req.session.isLoggedIn = true;
                      req.session.user_d = user.user_id;
                      req.session.user_name = user.user_name;
                  
                      req.session.save((error) => {
                        if (error) {

                            console.error('세션 저장 에러:', error);
                            // 에러 처리 로직 추가
                          } else {
                            res.status(200).json({ message: '로그인을 성공하셨습니다.', isSuccess: true, userdata: user });
                          }
                    
                      });
                    } else {
                      res.status(200).json({ message: '로그인을 실패하셨습니다.', isSuccess: false, userdata: user });
                    }
                  });
            } 
            else 
                console.log("User not found");
          
      });
});


module.exports = router;
