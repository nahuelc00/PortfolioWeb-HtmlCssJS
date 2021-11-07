function fetchContentful(contentTypeIdContentful) {
  //El "contentTypeIdContentful" es para acceder al contenido segun el tipo en contentful
  const url =
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/entries?access_token=454EuAflGHNEXcUtmcuWynXGLOmURqeD4BnVlwgTjgs&content_type=" +
    contentTypeIdContentful;
  return fetch(url).then((res) => {
    return res.json();
  });
}

function getImgCardService(item) {
  const imgId = item.fields.imagen.sys.id;
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

function getTitleCardService(item) {
  const title = item.fields.titulo;
  const templateCardEl = document.querySelector(".template-card-servicio");
  const titleCardEl = templateCardEl.content.querySelector(
    ".card-servicio__title"
  );
  titleCardEl.textContent = title;
}

function getTextCardService(item) {
  const text = item.fields.descripcionDelServicio.content[0].content[0].value;
  const templateCardEl = document.querySelector(".template-card-servicio");
  const textCardEl = templateCardEl.content.querySelector(
    ".card-servicio__text"
  );
  textCardEl.textContent = text;
}

function runCloneTemplate() {
  const templateCardEl = document.querySelector(".template-card-servicio");
  const contCardEl = document.querySelector(".contenedor__servicios");
  const clone = document.importNode(templateCardEl.content, true);
  contCardEl.appendChild(clone);
}

function showContentInCardService() {
  const contentTypeIdContentful = "servicios";
  const dataContentful = fetchContentful(contentTypeIdContentful);
  dataContentful.then((data) => {
    data.items.forEach((item) => {
      getImgCardService(item)
        .then((data) => {
          const templateCardEl = document.querySelector(
            ".template-card-servicio"
          );
          const imgCardEl = templateCardEl.content.querySelector(
            ".card-servicio__img"
          );
          imgCardEl.src = data.imgUrl;
        })
        .then(() => {
          getTitleCardService(item);
          getTextCardService(item);
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
  showContentInCardService();
}
main();
