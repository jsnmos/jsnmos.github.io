
  document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("imagePopup");
    const closeBtn = document.getElementById("closePopupBtn");
    const hideTodayBtn = document.getElementById("hideTodayBtn");

    // 쿠키 없으면 팝업 표시
    if (!getCookie("hideImagePopupToday")) {
      popup.style.display = "flex";
    }

    // 닫기
    closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });

    // 오늘 하루 보지 않기
    hideTodayBtn.addEventListener("click", function () {
      setCookie("hideImagePopupToday", "Y", 1);
      popup.style.display = "none";
    });

    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }

    function getCookie(name) {
      const match = document.cookie.match("(^|;) ?"+name+"=([^;]*)(;|$)");
      return match ? match[2] : null;
    }
  });
