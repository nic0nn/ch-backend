var admin = require("firebase-admin");
var serviceAccount = require("./firestore-key.json");

const connect = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("[+] Firestore conectado");
  } catch (error) {
    console.log("[-] Error al conectar Firestore");
  }
};

module.exports = { connect, admin };
