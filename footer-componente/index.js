function mountComponentFooter(contComponentFooterEl) {
  const footerNewEl = document.createElement("footer");
  footerNewEl.className = "footer";
  footerNewEl.innerHTML = `<img class="footer__logo" src="./logos/logo-nombre.png" alt="footer logo" />
  <div class="footer__cont-links">
    <div class="footer__cont-link">
      <a class="footer__link" href="https://www.instagram.com" target="__BLANK"
        >Instagram</a
      >
      <img
        class="footer__img-link"
        src="./logos/logo-instagram.png"
        alt="logo instagram"
      />
    </div>
    <div class="footer__cont-link">
      <a class="footer__link" href="https://www.linkedin.com" target="__BLANK" >Linkedin</a>
      <img
        class="footer__img-link"
        src="./logos/logo-linkedin.png"
        alt="logo linkedin"
      />
    </div>
    <div class="footer__cont-link">
      <a class="footer__link" href="https://www.github.com" target="__BLANK" >Github</a>
      <img
        class="footer__img-link"
        src="./logos/logo-github.png"
        alt="logo github"
      />
    </div>
  </div>`;

  function redirectPageHome() {
    const logoEl = footerNewEl.querySelector(".footer__logo");
    logoEl.addEventListener("click", () => {
      window.location = "./index.html";
    });
  }
  redirectPageHome();

  contComponentFooterEl.appendChild(footerNewEl);
}
