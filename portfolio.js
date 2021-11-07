function fetchContentful(contentTypeIdContentful) {
  //El "contentTypeIdContentful" es para acceder al contenido segun el tipo en contentful
  const url =
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/entries?access_token=454EuAflGHNEXcUtmcuWynXGLOmURqeD4BnVlwgTjgs&content_type=" +
    contentTypeIdContentful;
  return fetch(url).then((res) => {
    return res.json();
  });
}

function getImgCardTrabajo(item) {
  //Esta funcion obtiene la imagen segun el id, haciendo fetch a contentful nuevamente
  const imgId = item.fields.imagenDelTrabajo.sys.id;
  const url =
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/assets/" +
    imgId +
    "/?access_token=454EuAflGHNEXcUtmcuWynXGLOmURqeD4BnVlwgTjgs";
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return {
        imgUrl: "https:" + data.fields.file.url,
      };
    });
}

function getTitleCardTrabajo(item) {
  const title = item.fields.tituloDelTrabajo;
  const templateCardEl = document.querySelector(".template-card-trabajo");
  const titleCardEl = templateCardEl.content.querySelector(
    ".card-trabajo__title"
  );
  titleCardEl.textContent = title;
}

function getTextCardTrabajo(item) {
  const text = item.fields.descripcionDelTrabajo.content[0].content[0].value;
  const templateCardEl = document.querySelector(".template-card-trabajo");
  const textCardEl = templateCardEl.content.querySelector(
    ".card-trabajo__text"
  );
  textCardEl.textContent = text;
}

function getLinkCardTrabajo(item) {
  const link = item.fields.url;
  const templateCardEl = document.querySelector(".template-card-trabajo");
  const linkCardEl = templateCardEl.content.querySelector(
    ".card-trabajo__link"
  );
  linkCardEl.href = link;
  linkCardEl.textContent = link;
}

function runCloneTemplate() {
  const templateCardEl = document.querySelector(".template-card-trabajo");
  const contCardEl = document.querySelector(".contenedor__trabajos");
  const clone = document.importNode(templateCardEl.content, true);
  contCardEl.appendChild(clone);
}

function showContentInCardTrabajo() {
  const contentTypeIdContentful = "portfolio";
  const dataContentful = fetchContentful(contentTypeIdContentful);
  dataContentful.then((data) => {
    data.items.forEach((item) => {
      getImgCardTrabajo(item)
        .then((data) => {
          const templateCardEl = document.querySelector(
            ".template-card-trabajo"
          );
          const imgCardEl =
            templateCardEl.content.querySelector(".card-trabajo__img");
          imgCardEl.src = data.imgUrl;
        })
        .then(() => {
          getTitleCardTrabajo(item);
          getTextCardTrabajo(item);
          getLinkCardTrabajo(item);
          runCloneTemplate();
        });
    });
  });
}

function mountComponents() {
  const contCompHeaderEl = document.querySelector(".contenedor__header");
  const contCompFooterEl = document.querySelector(".contenedor__footer");

  mountComponentHeader(contCompHeaderEl);
  mountComponentFooter(contCompFooterEl);
}

function main() {
  mountComponents();
  showContentInCardTrabajo();
}
main();
