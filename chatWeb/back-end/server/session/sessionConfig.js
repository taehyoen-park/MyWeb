const session = require('express-session');
const memoryStore = require('memorystore')(session);
const sessionMiddleware = session({
    secret: 'pjb5289@',
    resave: false,
    saveUninitialized: true,
    store: new memoryStore({
        checkPeriod: 86400000, // 세션 데이터의 유효성을 체크하는 주기 (기본값: 24시간)
      }),
    cookie: {
        path: '/',
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: 'None',
        httpOnly: false,
        secure: true,
    },
    name:"yate",
});

module.exports = sessionMiddleware;