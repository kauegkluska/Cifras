const express = require("express");

const webUsuarioController = require("../controllers_web/WebUsuarioController");
const webResourcesController = require("../controllers_web/WebResourcesController")
const router = express.Router();


// Rotas de Resources
router.get("/resources", webResourcesController.index);
router.get("/resources/create", webResourcesController.create);
router.post("/resources", webResourcesController.store);
router.get("/resources/:resourcesId", webResourcesController.show);
router.get("/resources/:resourcesId/edit", webResourcesController.edit);
router.put("/resources/:resourcesId", webResourcesController.update);
router.delete("/resources/:resourcesId", webResourcesController.destroy);



router.get("/recurso", async (request, response) => {
    response.render("Recurso/index", {layout: "Layouts/main", title: "Recursos"});
});

router.get("/", async (request, response) => {
    response.render("index", {layout: "Layouts/main", title: "Página inicial"});
});

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



module.exports = router;