// ORM - Sequelize
import Sequelize from "sequelize";
// Configuração do Sequelize
import connection from "../config/sequelize-config.js";
// .define cria a tabela no banco
const Piloto = connection.define("pilotos", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nacionalidade: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
// Não força a criação da tabela caso já exista
Piloto.sync({ force: false });
export default Piloto;
