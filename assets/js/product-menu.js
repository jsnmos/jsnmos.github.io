document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menu = header?.querySelector(".menu01");
  if (!header || !menu) return;

  const button = document.createElement("button");
  button.className = "menu-toggle";
  button.type = "button";
  button.setAttribute("aria-label", "제품 메뉴 열기");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "product-menu");
  button.innerHTML = '<span class="menu-toggle-lines" aria-hidden="true"></span>';
  menu.id = "product-menu";
  header.append(button);

  const closeMenu = (returnFocus = false) => {
    menu.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "제품 메뉴 열기");
    if (returnFocus) button.focus();
  };

  button.addEventListener("click", () => {
    const willOpen = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
    button.setAttribute("aria-label", willOpen ? "제품 메뉴 닫기" : "제품 메뉴 열기");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) closeMenu(true);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });
});
