const express = require('express');
const router = express.Router();

module.exports = (connection) => {

  // 상품관리 페이지 렌더링
  router.get('/', async (req, res) => {
    try {
      // 세션에 로그인된 사용자가 있는지 확인
      if (!req.session.user) {
        // 로그인되지 않은 상태에서 마이페이지에 접근하면 로그인 페이지로 리다이렉트
        return res.redirect('/login');
      }

      // 로그인된 사용자 정보 가져오기
      const user = req.session.user;
     
      res.render('products_ctl', {
        title: '상품관리',
        user: user, // 세션에서 사용자 정보 전달
      });

    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }
  });

  return router; 
};
