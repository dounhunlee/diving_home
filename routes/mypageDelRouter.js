const express = require('express');
const router = express.Router();

module.exports = (connection) => {

  // 마이페이지 화면 렌더링
  router.get('/', async (req, res) => {
    try {
      // 세션에 로그인된 사용자가 있는지 확인
      if (!req.session.user) {
        // 로그인되지 않은 상태에서 마이페이지에 접근하면 로그인 페이지로 리다이렉트
        return res.redirect('/login');
      }

      // 로그인된 사용자 정보 가져오기
      const user = req.session.user;
      console.log("마이페이지 : ",user)
      // 로그인된 사용자 정보 기반으로 마이페이지 렌더링
      res.render('mypage_del', {
        title: '마이페이지 회원탈퇴',
        user: user, // 세션에서 사용자 정보 전달
      });

    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }
  });
  router.post("/", async (req, res) => {
    const { pwd } = req.body;
    const user = req.session.user;

    try {
      // 비밀번호 확인 쿼리
      const checkPwdSql = `
        SELECT usr_id 
        FROM login 
        WHERE usr_id = ? AND usr_pwd = HEX(AES_ENCRYPT(?, 'encryption_key'))
      `;
      const [rows] = await connection.execute(checkPwdSql, [user.usr_id, pwd]);

      if (rows.length === 0) {
        return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); window.history.back();</script>");
      }

      // 회원 삭제 쿼리
      const deleteSql = `DELETE FROM login WHERE usr_id = ?`;
      await connection.execute(deleteSql, [user.usr_id]);

      req.session.destroy(); // 세션 삭제
      res.send("<script>alert('회원탈퇴가 완료되었습니다.'); window.location.href='/';</script>");
    } catch (error) {
      console.error("Error during user deletion:", error);
      res.send("<script>alert('회원탈퇴 중 오류가 발생했습니다.'); window.history.back();</script>");
    }
  });
  return router; 
};
