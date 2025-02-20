const express = require("express");

const webUsuarioController = require("../controllers_web/WebUsuarioController");
const webResourcesController = require("../controllers_web/WebResourcesController")
const ResourcesModel = require("../models/ResourcesModel");
const router = express.Router();

// Rotas de Cifras (anteriormente Resources)
router.get("/cifra", webResourcesController.index);
router.get("/cifra/create", webResourcesController.create);
router.post("/cifra", webResourcesController.store);
router.get("/cifra/:resourcesId", webResourcesController.show);
router.get("/cifra/:resourcesId/edit", webResourcesController.edit);
router.put("/cifra/:resourcesId", webResourcesController.update);
router.delete("/cifra/:resourcesId", webResourcesController.destroy);

// Rotas de Autenticação
router.get("/usuario/login", webUsuarioController.loginForm);
router.post("/usuario/login", webUsuarioController.login);
router.post("/usuario/logout", webUsuarioController.logout);

// Rotas de Usuário
router.get("/usuario", webUsuarioController.index);
router.get("/usuario/create", webUsuarioController.create);
router.post("/usuario", webUsuarioController.store);
router.get("/usuario/:id", webUsuarioController.show);
router.get("/usuario/:id/edit", webUsuarioController.edit);
router.get("/usuario/:id/editemailpassword", webUsuarioController.editEmailPassword);
router.put("/usuario/:id/editemailpassword", webUsuarioController.updateEmailPassword);
router.put("/usuario/:id", webUsuarioController.update);
router.delete("/usuario/:id", webUsuarioController.destroy);

// Página inicial
router.get("/", async (request, response) => {
    const resources = await ResourcesModel.findAll();
    const usuario = request.session.usuario || null;
    response.render("index", {layout: "Layouts/main", title: "Página inicial", resources: resources, usuario: usuario});
});

module.exports = router;