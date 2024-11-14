const express = require('express');
const app = express();
const port = 8001;
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2/promise'); // mysql2의 promise를 사용하여 비동기 처리를 합니다.
const axios = require("axios");
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 세션 설정
app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// 데이터베이스에 연결하는 비동기 함수
async function initializeDatabase() {
  try {
    // createPool을 사용해서 일정시간 동안 신호가 없으면 자동으로 db 접속 끊기는 현상 방지
    const pool = mysql.createPool({
      host: process.env.SERVER,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: parseInt(process.env.PORT),
      // 여기서부터 db 접속 연결 지속 장치
      waitForConnections: true, 
        // 연결 풀이 가득 찬 상태에서 새로운 연결 요청이 들어올 경우 대기
      connectionLimit: 2,
        // db에 동시 연결할 수 있는 연결 수
      queueLimit: 0,
        // 풀이 가득 찼을떄 대기할 수 있는 최대 요청 수 (0은 제한없음)
      keepAliveInitialDelay: 10000,
        // TCP 연결이 유지되도록 하기 위한 초기 지연 시간
      enableKeepAlive: true,
        // 주기적으로 Keep-Alive 패킷을 보내서 연결이 끊어지지 않게함 (true 활성화)
    });

    console.log('데이터베이스 연결 성공');
    return pool;
  } catch (err) {
    console.error('데이터베이스 연결 실패:', err.message);
    process.exit(1);
  }
}

// 서버 시작
async function startServer() {
  const connection = await initializeDatabase();

  // 정적 파일 제공
  app.use(express.static(path.join(__dirname, 'public')));

  // EJS 템플릿 엔진 설정
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.set('views', __dirname + '/views');
  // 라우터 설정
  const homeRouter = require('./routes/homeRouter');
  app.use('/', homeRouter(connection));
  const loginRouter = require('./routes/loginRouter');
  app.use('/login', loginRouter(connection));
  const joinRouter = require('./routes/joinRouter');
  app.use('/join', joinRouter(connection));
  const mypageRouter = require('./routes/mypageRouter');
  app.use('/my', mypageRouter(connection));
  const productsRouter = require('./routes/productsRouter');
  app.use('/products', productsRouter(connection));
  const productsRegRouter = require('./routes/productsRegRouter');
  app.use('/products_reg', productsRegRouter(connection));

  // 전역 로그아웃 경로 추가
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('로그아웃 오류');
      } else {
        res.redirect('/');
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer(); // 서버 시작
