const express = require("express");
const { addAdmin } = require("../middlewares/auth");
const { isAdmin } = require("./../config")
const router = require("../routes");
const app = express();

app.use(express.json());
app.use(addAdmin);

app.use("/api", router);

exports.start = (PORT) =>
  app.listen(PORT, () => {
    if (isAdmin) console.log(`[+] Ejecutando como administrador...`)
    console.log(`[+] Servidor iniciado en el puerto ${PORT}`);
  });
