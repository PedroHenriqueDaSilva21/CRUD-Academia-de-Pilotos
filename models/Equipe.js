// ORM - Sequelize
import Sequelize from "sequelize";
// Configuração do Sequelize
import connection from "../config/sequelize-config.js";
// .define cria a tabela no banco
const Equipe = connection.define("equipes", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  regiao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
// Não força a criação da tabela caso já exista
Equipe.sync({ force: false });
export default Equipe;
