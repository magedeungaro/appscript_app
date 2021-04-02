const fs = require("fs");

const files = {
  css: {
    from: "./dist/css.html",
    to: "./src/css.html",
  },
  index: {
    from: "./client/html/index.html",
    to: "./src/index.html",
  },
  pedido: {
    from: "./client/html/pedido.html",
    to: "./src/pedido.html",
  },
};

Object.values(files).forEach((value) => {
  fs.copyFileSync(value.from, value.to);
});
