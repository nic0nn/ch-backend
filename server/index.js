const express = require("express");

const middlewares = require("../middlewares");

const { IS_ADMIN } = require("./../config");
const router = require("../routes");

const app = express();

exports.start = (PORT) =>
  app.listen(PORT, async () => {

    app.use(express.json());
    app.use(middlewares.auth.addAdmin);

    app.use("/api", router);

    // error handler
    app.use(middlewares.errors);

    if (IS_ADMIN) console.log(`[+] Ejecutando como administrador...`);
    console.log(`[+] Servidor iniciado en el puerto ${PORT}`);
  });
