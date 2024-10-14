// Importando o Express com ES6 Modules
import express from "express";
// Iniciando o Express na variável app
const app = express();
// Importando o Sequelize (com os dados da conexão)
import connection from "./config/sequelize-config.js";
// Importando os Controllers (onde estão as rotas)
import EquipesController from "./controllers/EquipesController.js";
import EquipamentosController from "./controllers/EquipamentosController.js";
import PilotosController from "./controllers/PilotosController.js";

// Permite capturar dados vindo de formulários
app.use(express.urlencoded({extended: false}))

// Realizando a conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS f1;`).then(() => {
  console.log("O banco de dados está criado.");
}).catch((error) => {
    console.log(error)
});

// Define o EJS como Renderizador de páginas
app.set("view engine", "ejs");
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static("public"));

// Definindo o uso das rotas dos Controllers
app.use("/", EquipesController);
app.use("/", EquipamentosController);
app.use("/", PilotosController);

// ROTA PRINCIPAL
app.get("/", function (req, res) {
  res.render("index");
});

// INICIA O SERVIDOR NA PORTA 8080
app.listen(3000, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
});
