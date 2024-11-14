const express = require('express');
const router = express.Router();
const {getHomeData} = require('../routes/dbQuery');
// 데이터베이스 연결 객체를 외부에서 주입받기 위해 connection 매개변수를 추가
module.exports = (connection) => {
    
    // 로그인 페이지 렌더링
    router.get('/', async (req, res) => {
      try {

        // 로그인 페이지 렌더링
        res.render('login', {
          title: '로그인 페이지',
          user: req.session.user, // 세션에서 사용자 정보 가져오기

        });
      } catch (error) {
        console.error('Error while fetching data:', error);
        res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
      }
    });

    // 로그인 처리
    router.post('/', async (req, res) => {
      const { id, pwd } = req.body;
      console.log("로그인 시 사용자가 입력한 id, pw 정보", req.body);
      
      try {
          // SQL 쿼리 실행
          const [result] = await connection.query(`
            SELECT 
              usr_id, 
              usr_pwd, 
              usr_name,
              admin_chk,
              birth_day,
              sex
            FROM 
              login 
            WHERE usr_id = ? 
            AND AES_DECRYPT(UNHEX(usr_pwd), ?) = ?`, [id, 'encryption_key', pwd]);
  
          if (result.length > 0) {
              const user = result[0];
              
              // 세션에 사용자 정보 저장
              req.session.user = user ;

             
              console.log("세션에 저장된 사용자 정보:", req.session.user);  // 세션 정보 출력 확인
              console.log("chk 확인:", user.chk); // chk 값 콘솔 출력
              res.redirect('/'); // 로그인 성공 후 / 경로로 이동
  
          } else {
              res.send('<script>alert("아이디 또는 비밀번호가 잘못되었습니다."); location.href="/login";</script>'); // 아이디 또는 비밀번호 불일치 처리
          }
      } catch (err) {
          console.error(err);
          res.status(500).send('서버 오류');
      }
  });



    return router; // 라우터를 반환합니다.
};
