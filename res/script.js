document.addEventListener("DOMContentLoaded", () => {
  const item = document.querySelector(".item");
  const itemRight = document.querySelector(".item-right");
  const footer = document.querySelector("footer");

  // 스크롤 시 실행
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const itemTop = item.offsetTop;
    const itemHeight = item.offsetHeight;
    const rightHeight = itemRight.offsetHeight;
    const footerTop = footer.offsetTop;

    // 고정 시작 위치
    const startFix = itemTop;
    // 고정 종료 위치 (footer와 겹치기 직전)
    const endFix = footerTop - rightHeight - 40; // 여유 40px

    if (scrollY < startFix) {
      // item 시작 전 → 원래 자리
      itemRight.style.position = "absolute";
      itemRight.style.top = "0px";
    } else if (scrollY >= startFix && scrollY < endFix) {
      // 따라다니는 구간
      itemRight.style.position = "fixed";
      itemRight.style.top = "50px"; // 브라우저 상단에서의 거리
      itemRight.style.right = `calc((100% - 1180px)/2)`; // 중앙정렬 기준
    } else {
      // footer 도달 → 멈춤
      itemRight.style.position = "absolute";
      itemRight.style.top = `${itemHeight - rightHeight}px`;
      itemRight.style.right = "0";
    }
  });
});