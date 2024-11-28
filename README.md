

## 📝 소개

프리다이빙 교육 업체인 BlueWhale(블루웨일)의 홈페이지를 제작

해당 홈페이지는 아마존 웹 서비스에서 제공하는 클라우드(AWS EC2)를 통해 연결되어있으며,

http://15.164.178.74:3001/ 로 접속하여 확인하실 수 있습니다.

테스트를 위한 로그인 admin 계정은 최하단에 작성하겠습니다.

<br />

## 주요 기능

1. 회원가입 기능
   - 아이디, 비밀번호, 이름, 생일, 성별을 입력받아서 login 테이블에 insert 하는 기능
   - 비밀번호는 보안문제로 인해 암호화해서 비밀번호 칼럼에 저장
2. 로그인 기능
   - 회원가입을 통해 login 테이블에 insert된 행을 select 해서 아이디와 비밀번호가 일치하면 로그인시켜주는 기능
   - 암호화로 저장된 비밀번호는 복호화를 통해 사용자가 입력한 비밀번호와 일치 여부를 확인후 일치하면 로그인
3. 내정보 수정
   - 로그인 성공한 사용자는 내정보 탭을 통해 비밀번호, 생일, 성별을 변경 가능
4. 회원탈퇴 기능
   - 회원탈퇴 요청 시 현재 사용자의 비밀번호를 재 입력 후 일치하면 해당 사용자의 login 테이블 행을 삭제시키는 기능
5. API를 통한 날씨 정보
   - 메인 화면에서 다이빙 포인트로 방문하게 되는 바다 주변의 날씨를 실시간 값으로 받아와서 화면에 표시하는 기능
   - OpenWeather API 사용
6. 상품 관련 기능
    - 관리자로 로그인 한 경우 상품을 등록할 수 있으며, 상품명, 가격, 설명, 상품이미지를 입력하고 등록을 누르면 products 테이블에 저장
    - 저장된 상품은 상품 탭에서 유저에게 보여지며, 특정 상품 클릭 시 디테일 페이지로 이동 (현재는 해당 상품의 PK값인 products_id 값을 쿼리스트링으로 받아서 보여주는 정도의 기능만 담당)
    - 상품을 삭제해야하거나 잘못 등록한 경우 상품관리탭에서 상품 삭제 체크를 통해서 체크한 행 삭제 가능
7. 문의하기
    - 문의하기 탭에서 작성자의 이름, 휴대폰 번호, 이메일 주소, 문의 내용을 입력하고 문의하기 버튼을 통해서 문의 가능
    - 단, 네이버 메일 내 SMTP 서버 설정을 해야하기 때문에 보내는 사람과 받는 사람의 이메일은 모두 관리자의 이메일로 설정함


## 테스트 아이디

아이디 : admin
비밀번호 : 1
