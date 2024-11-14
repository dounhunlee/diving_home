
document.addEventListener("DOMContentLoaded", function() {
    // "로그인" 버튼을 가져오기
    const loginButtons = document.getElementsByClassName("loginBtn");
    Array.from(loginButtons).forEach(function(button) {
        button.addEventListener("click", function() {
            window.location.href = "/login";
        });
    });

    // "로그아웃" 버튼을 가져오기
    const logoutButton = document.getElementsByClassName("logoutBtn");
    Array.from(logoutButton).forEach(function(button) {
        button.addEventListener("click", function() {
            window.location.href = "/logout";
        });
    });

    // "회원가입" 버튼을 가져오기
    const joinButton = document.getElementsByClassName("joinBtn");
    Array.from(joinButton).forEach(function(button) {
        button.addEventListener("click", function() {
            window.location.href = "/join";
        });
    });




    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile_v');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close_btn_img');
    
    // 햄버거 버튼 클릭 시 모바일 메뉴 열기
    hamburgerBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open'); // 모바일 메뉴 열기
        overlay.classList.add('show'); // 오버레이 보여주기
    });
    
    // 오버레이 클릭 시 모바일 메뉴와 오버레이 닫기
    overlay.addEventListener('click', closeMobileMenu);
    
    // 닫기 버튼 클릭 시 모바일 메뉴와 오버레이 닫기
    closeBtn.addEventListener('click', closeMobileMenu);
    
    // 화면 크기가 변경될 때 모바일 메뉴 닫기
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1260 && mobileMenu.classList.contains('open')) {
            closeMobileMenu(); // 1260px 이상일 때 메뉴 닫기
        }
    });
    
    // 모바일 메뉴와 오버레이 닫기 함수
    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('show');
    }
    
});
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 0) {
        header.style.position = 'fixed'; // 스크롤 시 고정
        header.style.top = '0'; // 최상단 위치
    } else {
        header.style.position = 'absolute'; // 원래 위치로 돌아감
        header.style.top = '0'; // 최상단 위치
    }
});




  