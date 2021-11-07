function mountComponentForm(contComponentFormEl) {
  const formContactNewEl = document.createElement("div");
  formContactNewEl.className = "contacto";

  formContactNewEl.innerHTML = `
  <h2 class="contacto__title">Escribime</h2>
  <form class="form">
    <fieldset class="form__fieldset">
      <label class="form__label">
        NOMBRE <input type="text" name="nombre" class="form__input"
      /></label>
    </fieldset>

    <fieldset class="form__fieldset">
      <label class="form__label"
        >EMAIL<input type="email" name="email" class="form__input"
      /></label>
    </fieldset>

    <fieldset class="form__fieldset form__fieldset--textarea">
      <label class="form__label"
        >MENSAJE
        <textarea
          name="mensaje"
          class="form__input form__input--textarea"
        ></textarea>
      </label>
    </fieldset>

    <button class="form__button">Enviar</button>
  </form>`;

  function fetchApx(datos) {
    const url = "https://apx-api.vercel.app/api/utils/dwf";
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(datos),
    }).then((res) => {
      if (res.status === 200 && res.ok === true) {
        const inputFormDomEls = document.querySelectorAll(".form__input");
        inputFormDomEls.forEach((item) => {
          item.value = "";
        });
        alert("Mensaje enviado!");
      } else {
      }
    });
  }

  function enviarDatos() {
    const formEl = formContactNewEl.querySelector(".form");
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      let nameInput = e.target.nombre.value;
      let emailInput = e.target.email.value;
      let mensajeInput = e.target.mensaje.value;
      const datosUser = {
        name: nameInput,
        to: emailInput,
        message: mensajeInput,
      };
      fetchApx(datosUser);
    });
  }
  enviarDatos();

  contComponentFormEl.appendChild(formContactNewEl);
}
