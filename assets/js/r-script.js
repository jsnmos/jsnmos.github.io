document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.rel = "noopener noreferrer";
  });
  document.querySelectorAll("img").forEach((image) => {
    if (!image.hasAttribute("alt")) image.alt = `${document.title} 관련 이미지`;
    image.loading = image.closest("header, .left") ? "eager" : "lazy";
    image.decoding = "async";
  });
  document.querySelectorAll("video").forEach((video) => {
    video.preload = "metadata";
  });
  document.querySelectorAll("iframe").forEach((frame) => {
    frame.loading = "lazy";
  });

  document.querySelectorAll(".openPopup").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(
        "https://oktarnd.kr/popup.html",
        "estimatePopup",
        "width=700,height=900,top=100,left=100,resizable=yes,scrollbars=yes"
      );
    });
  });
});
