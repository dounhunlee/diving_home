const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather', async (req, res) => {
    const cities = [
        { name: '제주도', lat: 33.226884, lon: 126.565882 }, // 제주도
        { name: '울릉도', lat: 37.501910, lon: 130.855536 }, // 울릉도
        { name: '삼척시', lat: 37.280552, lon: 129.325182 }, // 울릉도
        { name: '영덕군', lat: 36.465718, lon: 129.437653 }, // 울릉도
        { name: '가거도', lat: 34.071193, lon: 125.115821 }, // 울릉도
        { name: '통영시', lat: 34.565508, lon: 128.185741 }, // 울릉도
        { name: '여수시', lat: 34.047533, lon: 127.318940 }, // 울릉도
        { name: '포항시', lat: 35.997275, lon: 129.566637 }, // 울릉도
        { name: '남해군', lat: 34.710099, lon: 128.046761 }, // 울릉도
    ]; 
    const apiKey = '8afb63935dbb9e92d199925f029e0a41'; // 발급받은 API 키를 넣으세요.


    try {
        // 여러 도시의 날씨 정보를 저장할 배열
        const weatherData = await Promise.all(
            cities.map(async (city) => {
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`;
                const response = await axios.get(url);
                return {
                    city: city.name,
                    temperature: response.data.main.temp, // 섭씨 온도
                    weather: response.data.weather[0].main, // 날씨 상태 (Clear, Rain 등)
                    icon: response.data.weather[0].icon, // 아이콘 코드
                };
            })
        );

        res.json({ weatherData }); // 도시별 온도 데이터를 클라이언트로 반환
    } catch (error) {
        console.error('OpenWeather API 요청 중 오류 발생:', error);
        res.status(500).json({ error: 'API 요청 실패' });
    }
});

module.exports = router;
