const express = require('express');
const router = express.Router();

module.exports = (connection) => {

  // 상품삭제 페이지 렌더링
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
      const sql = `
      SELECT 
        product_id, 
        product_name, 
        price, 
        description, 
        product_img 
      FROM 
        products
`;
     
      // 데이터베이스에서 상품 목록 조회
      const [products] = await connection.query(sql);
     
      res.render('products_del', {
        title: '상품 삭제',
        products: products, 
        user: user, // 세션에서 사용자 정보 전달
      });

    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }
  });
  router.post('/', async (req, res) => {
    try {
      const { product_ids } = req.body; // 체크된 상품 ID들
      
      if (!product_ids || product_ids.length === 0) {
        return res.send("<script>alert('삭제할 상품을 선택하세요.'); window.location.href='/products';</script>");
      }

      // 여러 개의 ID 삭제 쿼리
      const deleteSql = `DELETE FROM products WHERE product_id IN (?)`;
      await connection.query(deleteSql, [Array.isArray(product_ids) ? product_ids : [product_ids]]);

      res.send("<script>alert('선택한 상품이 삭제되었습니다.'); window.location.href='/products_del';</script>");
    } catch (error) {
      console.error('Error while deleting products:', error);
      res.send("<script>alert('상품 삭제 중 오류가 발생했습니다. 다시 시도하세요.'); window.location.href='/products';</script>");
    }
  });
  return router; 
};
