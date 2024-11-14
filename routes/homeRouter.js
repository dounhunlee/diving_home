const express = require('express');
const router = express.Router();

const api = require('./api'); // sea_api 라우터 가져오기

const axios = require('axios'); // axios 추가
module.exports = (connection) => {
  router.use('/api', api); // /api 경로로 sea_api 사용
  
  router.get('/', async (req, res) => {
    try {


      // OpenWeather API에서 실시간 날씨 데이터 요청
      const apiResponse = await axios.get(`http://localhost:3000/api/weather`);
      const weatherData = apiResponse.data.weatherData; // 여러 도시의 날씨 데이터
    
      // 결과를 렌더링
      res.render('home', {
        title: '메뉴 페이지',
        user: req.session.user,

        weatherData: weatherData,
      });
      
    } catch (error) {
      console.error('Error while fetching data:', error);
      res.send("<script>alert('로딩이 지연되고 있습니다. 잠시 후에 다시 시도해 주세요.'); window.location.href = '/';</script>");
    }



    
  });
  

  return router; // 라우터를 반환합니다.
};