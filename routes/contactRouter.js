const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
module.exports = (connection) => {

  // 마이페이지 화면 렌더링
  router.get('/', async (req, res) => {
    try {

      res.render('contact', {
        title: '문의하기',
    
      });

    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }
  });



  router.post('/', async (req, res) => {
    const { name, email, content, tel } = req.body;

    // 이메일 전송을 위한 Nodemailer 설정
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',     // 네이버 SMTP 서버
      port: 465,                  // TLS 포트
      secure: true,              // TLS 사용
      auth: {
        user: process.env.EMAIL_USER, // .env 파일
        pass: process.env.EMAIL_PASS    // .env 파일
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,    
      to: process.env.EMAIL_USER,   
      subject: 'BlueWhale 문의',       
      text: `
          작성자 이름 : ${name}\n
          연락처 : ${tel}\n
          이메일 주소 : ${email}\n\n
          문의 내용 :\n${content}` // 본문
    };

    try {
      // 이메일 전송
      await transporter.sendMail(mailOptions);
      res.send("<script>alert('문의가 전송되었습니다.'); window.location.href = '/';</script>");
    } catch (error) {
      console.error("Error sending email:", error);
      res.send("<script>alert('이메일 전송에 실패했습니다.'); window.history.back();</script>");
    }
  });


  return router; 
};
