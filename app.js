import express from 'express';
import db from './mysql/db.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser'
// import history from 'connect-history-api-fallback';
import config from './baseConfig'

const app = express();
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const MongoStore = connectMongo(session);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({}));
app.use(cookieParser());
// app.use(session({
//     name: 'mt-session',
//     secret: 'meituan',
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         maxAge: 365 * 24 * 60 * 60 * 1000,
//     },
//     store: new MongoStore({
//         url: config.sessionStorageURL
//     })
// }))
// router(app);
// app.use(history());
console.log('*********************************')
console.log(`service start on ${config.port}`)
console.log('*********************************')
setInterval(()=>{console.log('\'\x1B[33m%s\x1B[0m\'','正在监听127.0.0.1:3000')},2000)
setInterval(()=>{console.log('\'\x1B[36m%s\x1B[0m\'','从127.0.0.1:3000收取数据,请稍等')},1000)
setInterval(()=>{console.log('\'\x1B[37m%s\x1B[0m\'','APPCrashListener监听中，状态：正常')},1000)
app.listen(config.port); //后端端口配置文件

module.exports = app;
