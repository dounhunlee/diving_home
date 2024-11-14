const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

module.exports = (connection) => {



// multer 설정 (업로드할 파일 저장 경로)
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // 이미지 파일이 저장될 폴더 경로
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // 파일명 설정
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 최대 파일 크기 10MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('JPG, JPEG, PNG 파일만 업로드 가능합니다.'));
    }
    cb(null, true);
  },
});


    // 로그인 페이지 렌더링
router.get('/', async (req, res) => {
  res.render('products_reg'); // join.ejs를 렌더링
});
// 상품 등록 처리
router.post('/', upload.single('product_img'), async (req, res) => {
  try {
    const { product_name, price, description } = req.body;
    let product_img = null;

    // 이미지 파일이 있을 경우 Base64로 변환
    if (req.file) {
      const imgData = fs.readFileSync(req.file.path); // 파일 읽기
      product_img = imgData.toString('base64'); // Base64 인코딩
      fs.unlinkSync(req.file.path); // 임시 파일 삭제
    }

    const sql = `
        INSERT INTO products (product_name, price, description, product_img)
        VALUES (?, ?, ?, ?)
    `;

    // 데이터베이스에 상품 정보 저장
    const [result] = await connection.execute(sql, [product_name, price, description, product_img]);

    res.send("<script>alert('상품이 등록되었습니다.'); window.location.href = '/products';</script>");
  } catch (error) {
    console.error('상품 등록 오류:', error);
    res.send("<script>alert('상품 등록에 실패했습니다.'); window.history.back();</script>");
  }
});

  return router; // 라우터를 반환
};
