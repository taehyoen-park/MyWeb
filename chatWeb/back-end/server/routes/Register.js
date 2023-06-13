const util = require("util");
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const crypto = require('crypto');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'chatm',
  password: 'Chatdb5389@',
  database: 'chatdb',
  port:'3306'
});

connection.connect();

const pbkdf2Promise = util.promisify(crypto.pbkdf2);
const randomBytesPromise = util.promisify(crypto.randomBytes);

const createSalt = async () => {
  const buf = await randomBytesPromise(64);

  return buf.toString("base64");
};

const createHashedPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
  const hashedPassword = key.toString("base64");

  return { hashedPassword, salt };
};

router.post("/Register", async (req, res) => {
    const password = createHashedPassword(req.body.password);
  
    const data = {
      user_id:req.body.user_id,
      user_password:(await password).hashedPassword,
      user_name:req.body.user_name,
      user_salt:(await password).salt
    }

    if(req.body.repeatpassword === req.body.password)
    {
        connection.query('select * from users WHERE user_id=?',
          req.body.user_id,
          function(error,result,fields)
          {
            if(error) throw error;

            if(result.length > 0)
              res.status(200).json({ message: '이미 존재하는 아이디입니다.', isSuccess:false});
            
            else  
            {
              connection.query('select * from users WHERE user_name=?',
                req.body.user_name,
                function(error2,result2,fields2)
                {
                  if(error2) throw error2;
                  
                  if(result2.length > 0) 
                    res.status(200).json({ message: '이미 존재하는 이름입니다.', isSuccess:false});

                  else
                  {
                    connection.query('INSERT INTO users set ?',
                    data,
                    function(error3,result3,fields3)
                    {
                      if (error3) throw error3;
                      
                      else
                        res.status(200).json({ message: '회원가입을 성공적으로 처리했습니다.', isSuccess:true });
                    });
                  }
                });
            }
        });

    }
    else
      res.status(200).json({ message: '비밀번호를 확인해 주세요', isSuccess:false});
  
  });

module.exports = router;