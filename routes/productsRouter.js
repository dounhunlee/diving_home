const express = require('express');
const router = express.Router();

module.exports = (connection) => {

  // 상품페이지 화면 렌더링
  router.get('/', async (req, res) => {
    try {


      // 로그인된 사용자 정보 가져오기
      const user = req.session.user;
     
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
        products: products, 
        user: user, // 세션에서 사용자 정보 전달
      });

    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }
  });
  // 상품 세부 정보 페이지 ("/products?detail=product_id")
  router.get('/detail', async (req, res) => {
    try {
      const productId = req.query.id; // 쿼리 스트링에서 product_id 가져오기

      if (!productId) {
        return res.send("<script>alert('상품을 찾을 수 없습니다.'); window.location.href='/products';</script>");
      }

      const sql = `
        SELECT 
          product_id, 
          product_name, 
          price, 
          description, 
          product_img 
        FROM 
          products
        WHERE product_id = ?`;

      // 상품 세부 정보 조회
      const [product] = await connection.query(sql, [productId]);

      if (product.length === 0) {
        return res.send("<script>alert('상품을 찾을 수 없습니다.'); window.location.href='/products';</script>");
      }

      // 상품 정보를 EJS로 전달하여 렌더링
      res.render('products_detail', {
        title: '상품 세부정보',
        product: product[0], // 세부 정보 페이지로 전달
      });

    } catch (error) {
      console.error('Error while fetching product details:', error);
      res.send("<script>alert('상품 정보 로딩에 실패했습니다. 다시 시도하세요.'); window.location.href='/products';</script>");
    }
  });
  return router; 
};
