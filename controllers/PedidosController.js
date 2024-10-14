import express from "express";
const router = express.Router();
// Importando o model de Cliente
import Pedido from "../models/Pedido.js";

// ROTA PEDIDOS
router.get("/pedidos", function (req, res) {
  Pedido.findAll().then((pedidos) => {
    res.render("pedidos", {
      pedidos: pedidos,
    });
  });
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/pedidos/new", (req, res) => {
  // RECEBENDO OS DADOS DO FORMULÁRIO E GRAVANDO NAS VARIÁVEIS
  const numero = req.body.numero;
  const preco = req.body.preco;
  
  Pedido.create({
    numero: numero,
    preco: preco,
  }).then(() => {
    res.redirect("/pedidos");
  });
});

// ROTA DE EXCLUSÃO DE CLIENTES
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/pedidos/delete/:id", (req, res) => {
  // COLETAR O ID QUE VEIO NA URL
  const id = req.params.id;
  // MÉTODO PARA EXCLUIR
  Pedido.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDIÇÃO DE CLIENTE
router.get("/pedidos/edit/:id", (req, res) => {
  const id = req.params.id;
  Pedido.findByPk(id).then((pedido) => {
    res.render("pedidosEdit", {
      pedido: pedido,
    });
  }).catch((error) => {
    console.log(error)
  }) 
});

// ROTA DE ALTERAÇÃO DE CLIENTE
router.post("/pedidos/update", (req, res) => {
  const id = req.body.id
  const numero = req.body.numero
  const preco = req.body.preco
  Pedido.update(
    {
      numero: numero,
      preco: preco
    },
    {where: {id : id}}
  ).then(() => {
    res.redirect("/pedidos")
  }).catch((error) => {
    console.log(error)
  })
})

export default router;
