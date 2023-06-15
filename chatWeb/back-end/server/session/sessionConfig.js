const session = require('express-session');
const redis = require('redis');
const dotenv= require('dotenv').config();;
const RedisStore = require('connect-redis').default;

const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost',
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
  });
  
redisClient.on('error', (error) => {
    console.error('Redis connection error:', error);
  });

redisClient.connect().catch(console.error);
const store = new RedisStore({ client: redisClient });

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  //store: store,
  cookie: {
    maxAge: 2628000000,
    httpOnly: true,
    secure: false,
  },
});

module.exports = sessionMiddleware;