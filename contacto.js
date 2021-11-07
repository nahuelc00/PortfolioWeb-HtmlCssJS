function changeTitleForm() {
  const titleFormEl = document.querySelector(".contacto__title");
  titleFormEl.textContent = "Contacto";
  titleFormEl.style.fontSize = "48px";
}

function mountComponents() {
  const contCompHeaderEl = document.querySelector(".contenedor__header");
  const contCompFormEl = document.querySelector(".contenedor__form");
  const contCompFooterEl = document.querySelector(".contenedor__footer");

  mountComponentHeader(contCompHeaderEl);
  mountComponentForm(contCompFormEl);
  mountComponentFooter(contCompFooterEl);
}

function main() {
  mountComponents();
  changeTitleForm();
}
main();
