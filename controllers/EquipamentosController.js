import express from "express";
const router = express.Router();
// Importando o model de Cliente
import Equipamento from "../models/Equipamento.js";

// ROTA PEDIDOS
router.get("/equipamentos", function (req, res) {
  Equipamento.findAll().then((equipamentos) => {
    res.render("equipamentos", {
      equipamentos: equipamentos,
    });
  });
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/equipamentos/new", (req, res) => {
  // RECEBENDO OS DADOS DO FORMULÁRIO E GRAVANDO NAS VARIÁVEIS
  const nome = req.body.nome;
  const preco = req.body.preco;
  const categoria = req.body.categoria;
  
  Equipamento.create({
    nome: nome,
    preco: preco,
    categoria: categoria,
  }).then(() => {
    res.redirect("/equipamentos");
  });
});

// ROTA DE EXCLUSÃO DE CLIENTES
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/equipamentos/delete/:id", (req, res) => {
  // COLETAR O ID QUE VEIO NA URL
  const id = req.params.id;
  // MÉTODO PARA EXCLUIR
  Equipamento.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/equipamentos");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDIÇÃO DE CLIENTE
router.get("/equipamentos/edit/:id", (req, res) => {
  const id = req.params.id;
  Equipamento.findByPk(id).then((equipamento) => {
    res.render("equipamentoEdit", {
      equipamento: equipamento,
    });
  }).catch((error) => {
    console.log(error)
  }) 
});

// ROTA DE ALTERAÇÃO DE CLIENTE
router.post("/equipamentos/update", (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const preco = req.body.preco
  const categoria = req.body.categoria
  Equipamento.update(
    {
      nome: nome,
      preco: preco,
      categoria: categoria,
    },
    {where: {id : id}}
  ).then(() => {
    res.redirect("/equipamentos")
  }).catch((error) => {
    console.log(error)
  })
})

export default router;
