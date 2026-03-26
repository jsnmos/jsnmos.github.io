
  document.addEventListener("DOMContentLoaded", function () {
    const popupLayer = document.querySelector(".popup-layer");
    const popupGrid = document.querySelector(".popup-grid");
    const hideCookieName = "hideImagePopupToday";

    if (!popupLayer || !popupGrid) return;

    const getPopupCards = () => Array.from(popupGrid.querySelectorAll(".popup-card"));

    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    function getCookie(name) {
      const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
      return match ? match[2] : null;
    }

    function updatePopupLayout() {
      const cards = getPopupCards();

      cards.forEach(card => {
        card.classList.remove("popup-card--single-last");
      });

      if (cards.length === 0) {
        popupLayer.style.display = "none";
        return;
      }

      if (cards.length % 2 === 1) {
        cards[cards.length - 1].classList.add("popup-card--single-last");
      }
    }

    function openPopupLayer() {
      popupLayer.style.display = "block";
      document.body.style.overflow = "hidden";
      updatePopupLayout();
    }

    function closePopupLayer() {
      popupLayer.style.display = "none";
      document.body.style.overflow = "";
    }

    // 오늘 하루 보지 않기 쿠키가 없을 때만 열기
    if (!getCookie(hideCookieName) && getPopupCards().length > 0) {
      openPopupLayer();
    }

    popupLayer.addEventListener("click", function (event) {
      const closeButton = event.target.closest(".popup-btn--close");
      const todayButton = event.target.closest(".popup-btn--today");

      if (closeButton) {
        const popupCard = closeButton.closest(".popup-card");
        if (popupCard) {
          popupCard.remove();
          updatePopupLayout();
        }
        return;
      }

      if (todayButton) {
        setCookie(hideCookieName, "Y", 1);
        closePopupLayer();
      }
    });
  });
