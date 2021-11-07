function fetchContentful(contentTypeId) {
  //El "contentTypeId" es para acceder al contenido segun el tipo en contentful
  const url =
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/entries?access_token=454EuAflGHNEXcUtmcuWynXGLOmURqeD4BnVlwgTjgs&content_type=" +
    contentTypeId;
  return fetch(url).then((res) => {
    return res.json();
  });
}

function showContentInSectionWelcome() {
  const contentTypeWelcomeId = "bienvenida";
  const welcomeTitleEl = document.querySelector(".welcome__title");
  const welcomeSubtitleEl = document.querySelector(".welcome__subtitle");
  const dataContentful = fetchContentful(contentTypeWelcomeId);
  dataContentful.then((data) => {
    const title = data.items[0].fields.titulo;
    const subtitle = data.items[0].fields.subtitulo;
    welcomeTitleEl.textContent = title;
    welcomeSubtitleEl.textContent = subtitle;
  });
}

function showContentInSectionPresentation() {
  const contentTypePresentationId = "presentacion";
  const presentacionImgEl = document.querySelector(".presentacion__img");
  const presentacionTitleEl = document.querySelector(".presentacion__title");
  const presentacionTextEl = document.querySelector(".presentacion__parrafo");
  const dataContentful = fetchContentful(contentTypePresentationId);
  dataContentful.then((data) => {
    const dataImg = data.includes.Asset[0].fields.file.url;
    const img = "https:" + dataImg;
    const title = data.items[0].fields.titulo;
    const text = data.items[0].fields.texto.content[0].content[0].value;
    presentacionTitleEl.textContent = title;
    presentacionTextEl.textContent = text;
    presentacionImgEl.src = img;
  });
}

function getImgsOfServices(item) {
  const idImage = item.fields.imagen.sys.id;
  const url =
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/assets/" +
    idImage +
    "/?access_token=454EuAflGHNEXcUtmcuWynXGLOmURqeD4BnVlwgTjgs";
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const img = "https:" + data.fields.file.url;
      return {
        urlImage: img,
      };
    });
}

function getTitleOfServices(item) {
  const templateServicesEl = document.querySelector(".template");
  const serviceTitleEl =
    templateServicesEl.content.querySelector(".servicio__title");
  const titulo = item.fields.titulo;
  serviceTitleEl.textContent = titulo;
}

function getTextOfServices(item) {
  const templateServicesEl = document.querySelector(".template");
  const serviceTextEl =
    templateServicesEl.content.querySelector(".servicio__text");
  const texto = item.fields.parrafo.content[0].content[0].value;
  serviceTextEl.textContent = texto;
}

function runCloneTemplate() {
  const contServicesEl = document.querySelector(".cont-servicios");

  const templateServicesEl = document.querySelector(".template");
  const clone = document.importNode(templateServicesEl.content, true);
  contServicesEl.appendChild(clone);
}

function showContentInSectionServicios() {
  const contentTypeServiciosId = "misServicios";
  const dataContentful = fetchContentful(contentTypeServiciosId);

  dataContentful.then((data) => {
    data.items.forEach((item) => {
      getImgsOfServices(item)
        .then((data) => {
          const templateServicesEl = document.querySelector(".template");
          const serviceImgEl =
            templateServicesEl.content.querySelector(".servicio__img");
          serviceImgEl.src = data.urlImage;
        })
        .then(() => {
          getTitleOfServices(item);
          getTextOfServices(item);
          runCloneTemplate();
        });
    });
  });
}

function mountComponents() {
  const contComponentHeaderEl = document.querySelector(".welcome__cont-header");
  const contComponentFormEl = document.querySelector(".formulario-contacto");
  const contComponentFooterEl = document.querySelector(".cont-comp-footer");

  mountComponentHeader(contComponentHeaderEl);
  mountComponentForm(contComponentFormEl);
  mountComponentFooter(contComponentFooterEl);
}

function main() {
  mountComponents();
  showContentInSectionWelcome();
  showContentInSectionPresentation();
  showContentInSectionServicios();
}
main();
