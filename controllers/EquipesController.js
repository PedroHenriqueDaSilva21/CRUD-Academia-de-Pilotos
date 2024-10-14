import express from "express";
const router = express.Router();
// Importando o model de Cliente
import Equipe from "../models/Equipe.js";

// ROTA equipes
router.get("/equipes", function (req, res) {
  Equipe.findAll().then((equipes) => {
    res.render("equipes", {
      equipes: equipes,
    });
  });
});

// ROTA DE CADASTRO DE equipes
router.post("/equipes/new", (req, res) => {
  // RECEBENDO OS DADOS DO FORMULÁRIO E GRAVANDO NAS VARIÁVEIS
  const nome = req.body.nome;
  const regiao = req.body.regiao;
  const titulo = req.body.titulo;
  Equipe.create({
    nome: nome,
    regiao: regiao,
    titulo: titulo,
  }).then(() => {
    res.redirect("/equipes");
  });
});

// ROTA DE EXCLUSÃO DE equipes
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/equipes/delete/:id", (req, res) => {
  // COLETAR O ID QUE VEIO NA URL
  const id = req.params.id;
  // MÉTODO PARA EXCLUIR
  Equipe.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/equipes");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDIÇÃO DE CLIENTE
router.get("/equipes/edit/:id", (req, res) => {
  const id = req.params.id;
  Equipe.findByPk(id).then((equipe) => {
    res.render("equipeEdit", {
      equipe: equipe,
    });
  }).catch((error) => {
    console.log(error)
  }) 
});

// ROTA DE ALTERAÇÃO DE CLIENTE
router.post("/equipes/update", (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const regiao = req.body.regiao
  const titulo = req.body.titulo
  Equipe.update(
    {
      nome : nome,
      regiao : regiao,
      titulo : titulo
    },
    {where: {id : id}}
  ).then(() => {
    res.redirect("/equipes")
  }).catch((error) => {
    console.log(error)
  })
})

export default router;
