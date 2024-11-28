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
      res.render('mypage', {
        title: '마이페이지',
        user: user, // 세션에서 사용자 정보 전달
      });

    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }
  });
  router.post('/', async (req, res) => {
    const { id, pwd, birth, sex } = req.body; 
    console.log("body : ",req.body)
    try {
        const sql = `
             UPDATE login 
            SET 
                usr_pwd = HEX(AES_ENCRYPT(?, ?)),
                birth_day = ?,
                sex = ?
            WHERE 
                usr_id = ?
        `;
        const [result] = await connection.execute(sql, [pwd, 'encryption_key', birth, sex, id]);
        
        
        
        res.send("<script>alert('회원정보가 수정되었습니다.'); window.location.href = '/';</script>");
    } catch (error) {
        console.error('회원가입 중 오류:', error);
        res.send("<script>alert('회원가입에 실패했습니다.'); window.history.back();</script>");
    }
});
  return router; 
};
