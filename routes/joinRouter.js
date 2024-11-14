const express = require('express');
const router = express.Router();
const {getHomeData} = require('../routes/dbQuery');
// 데이터베이스 연결 객체를 외부에서 주입받기 위해 connection 매개변수를 추가
module.exports = (connection) => {
    
    // 로그인 페이지 렌더링
    router.get('/', async (req, res) => {
        res.render('join'); // join.ejs를 렌더링
    });
    router.get('/id_chk', async (req, res) => {
        const { id } = req.query; // 클라이언트로부터 받은 id 값
        
        try {
         
            const [rows] = await connection.query('SELECT usr_id FROM login WHERE usr_id = ?', [id]);

            if (rows.length > 0) {
                res.json({ available: false }); // 아이디가 이미 존재할 때
            } else {
                res.json({ available: true }); // 아이디 사용 가능할 때
            }
        } catch (error) {
            console.error('ID 중복 체크 오류:', error);
            res.status(500).json({ available: false, error: '오류 발생' });
        }
    });
    // 회원가입 처리
    router.post('/', async (req, res) => {
        const { id, pwd, name, birth, sex } = req.body; // 성별 값도 추가로 받음
        console.log("회원가입 : ",req.body)
        try {
            const sql = `
                INSERT INTO login (
                    usr_id, 
                    usr_pwd, 
                    usr_name, 
                    birth_day,
                    sex,
                    admin_chk
                ) VALUES (
                    ?, 
                    HEX(AES_ENCRYPT(?, ?)), 
                    ?, 
                    ?, 
                    ?, 
                    "1"
                )
            `;
            const [result] = await connection.execute(sql, [id, pwd, 'encryption_key', name, birth, sex]);
            
            
            
            res.send("<script>alert('회원가입 성공! 로그인 페이지로 이동합니다.'); window.location.href = '/';</script>");
        } catch (error) {
            console.error('회원가입 중 오류:', error);
            res.send("<script>alert('회원가입에 실패했습니다.'); window.history.back();</script>");
        }
    });



    return router; // 라우터를 반환합니다.
};
