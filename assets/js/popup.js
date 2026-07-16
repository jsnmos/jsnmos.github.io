
  document.addEventListener("DOMContentLoaded", function () {
    const popupLayer = document.querySelector(".popup-layer");
    const popupGrid = document.querySelector(".popup-grid");
    const hideCookieName = "hideImagePopupToday";

    if (!popupLayer || !popupGrid) return;

    document.querySelectorAll("a[href]").forEach((link) => {
      const url = new URL(link.href, window.location.href);
      const isDifferentPage = url.origin !== window.location.origin || url.pathname !== window.location.pathname;
      if (isDifferentPage && !link.hasAttribute("target")) {
        link.target = "_blank";
      }
      if (link.target === "_blank") link.rel = "noopener noreferrer";
    });

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.rel = "noopener noreferrer";
    });
    document.querySelectorAll("img").forEach((image, index) => {
      image.loading = index < 3 ? "eager" : "lazy";
      image.decoding = "async";
    });

    let previouslyFocusedElement = null;

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
        closePopupLayer();
        return;
      }

      if (cards.length % 2 === 1) {
        cards[cards.length - 1].classList.add("popup-card--single-last");
      }
    }

    function openPopupLayer() {
      previouslyFocusedElement = document.activeElement;
      popupLayer.style.display = "block";
      popupLayer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      updatePopupLayout();
      popupLayer.querySelector("button")?.focus();
    }

    function closePopupLayer() {
      popupLayer.style.display = "none";
      popupLayer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      previouslyFocusedElement?.focus();
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

    popupLayer.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closePopupLayer();

      if (event.key === "Tab") {
        const focusable = Array.from(popupLayer.querySelectorAll("button, a[href]"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  });
