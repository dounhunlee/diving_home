const express = require('express');
const router = express.Router();

module.exports = (connection) => {

  // 상품페이지 화면 렌더링
  router.get('/', async (req, res) => {
    try {

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
      // console.log("상품 정보 : ",[products])
      res.render('products', {
        title: '상품 목록',
        products: products // 조회된 상품 목록을 EJS 템플릿에 전달
      });

    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }
  });

  return router; // 라우터를 반환
};
