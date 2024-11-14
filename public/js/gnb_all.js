document.addEventListener("DOMContentLoaded", function() {
    var depth1 = document.querySelectorAll(".gnb > li");
    var header = document.querySelector("header");
    
    // depth1에 마우스가 올라가면 header의 길이를 300px로 변경
    depth1.forEach(function(item) {
        item.addEventListener("mouseenter", function() {
            const submenus = document.querySelectorAll('.gnb > li > ul'); // 모든 서브메뉴 선택
            let maxHeight = 0; // 최대 높이를 저장할 변수
            
            // 각 서브메뉴의 높이를 비교하여 최대 높이 계산
            submenus.forEach(function(submenu) {
                const submenuHeight = submenu.offsetHeight; // 서브메뉴의 높이 가져오기
                if (submenuHeight > maxHeight) {
                    maxHeight = submenuHeight; // 최대 높이 업데이트
                }
            });
            
            header.style.transition = "height 0.5s"; // 부드러운 애니메이션 효과
            header.style.height = `${maxHeight + 80}px`; // 최대 높이에 기본 높이(80px)를 추가
        });

        item.addEventListener("mouseleave", function() {
            header.style.transition = "height 0.5s"; // 부드러운 애니메이션 효과
            header.style.height = "80px";
        });
    });
});
