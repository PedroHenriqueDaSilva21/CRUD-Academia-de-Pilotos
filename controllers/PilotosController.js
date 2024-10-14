import express from "express";
const router = express.Router();
// Importando o model de Cliente
import Piloto from "../models/Piloto.js";

// ROTA PEDIDOS
router.get("/pilotos", function (req, res) {
  Piloto.findAll().then((pilotos) => {
    res.render("pilotos", {
      pilotos: pilotos,
    });
  });
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/pilotos/new", (req, res) => {
  // RECEBENDO OS DADOS DO FORMULÁRIO E GRAVANDO NAS VARIÁVEIS
  const nome = req.body.nome;
  const nacionalidade = req.body.nacionalidade;
  
  Piloto.create({
    nome: nome,
    nacionalidade: nacionalidade,
  }).then(() => {
    res.redirect("/pilotos");
  });
});

// ROTA DE EXCLUSÃO DE CLIENTES
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/pilotos/delete/:id", (req, res) => {
  // COLETAR O ID QUE VEIO NA URL
  const id = req.params.id;
  // MÉTODO PARA EXCLUIR
  Piloto.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/pilotos");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDIÇÃO DE CLIENTE
router.get("/pilotos/edit/:id", (req, res) => {
  const id = req.params.id;
  Piloto.findByPk(id).then((piloto) => {
    res.render("pilotoEdit", {
      piloto: piloto,
    });
  }).catch((error) => {
    console.log(error)
  }) 
});

// ROTA DE ALTERAÇÃO DE CLIENTE
router.post("/pilotos/update", (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const nacionalidade = req.body.nacionalidade
  Piloto.update(
    {
      nome: nome,
      nacionalidade: nacionalidade
    },
    {where: {id : id}}
  ).then(() => {
    res.redirect("/pilotos")
  }).catch((error) => {
    console.log(error)
  })
})

export default router;
