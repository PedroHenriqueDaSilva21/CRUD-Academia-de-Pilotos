// Importando o Sequelize
import Sequelize from "sequelize";
// Criando os dados de conexão com o banco de dados
const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "", //Alunos deixem a senha em branco
  port: '3307',
  // Comente essa linha na primeira execução da aplicação
  database: 'f1',
  timezone: "-03:00",
});
export default connection;
