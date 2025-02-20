const express = require("express");

const webUsuarioController = require("../controllers_web/WebUsuarioController");
const webResourcesController = require("../controllers_web/WebResourcesController");
const ResourcesModel = require("../models/ResourcesModel");
const router = express.Router();

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.usuario) {
        return next();
    } else {
        req.session.message = ["warning", "Por favor, faça login para acessar esta página."];
        return res.redirect("/usuario/login");
    }
}

// Middleware para verificar se o usuário é o dono do recurso
async function isOwner(req, res, next) {
    const resource = await ResourcesModel.findOne(req.params.resourcesId);
    if (resource && resource.usuarioId === req.session.usuario.id) {
        return next();
    } else {
        req.session.message = ["warning", "Você não tem permissão para realizar esta ação."];
        return res.redirect("/cifra");
    }
}

// Rotas de Cifras (anteriormente Resources)
router.get("/cifra", webResourcesController.index);
router.get("/cifra/create", isAuthenticated, webResourcesController.create); // Apenas usuários autenticados podem criar cifras
router.post("/cifra", isAuthenticated, webResourcesController.store); // Apenas usuários autenticados podem salvar cifras
router.get("/cifra/:resourcesId", webResourcesController.show);
router.get("/cifra/:resourcesId/edit", isAuthenticated, isOwner, webResourcesController.edit); // Apenas o dono pode editar
router.put("/cifra/:resourcesId", isAuthenticated, isOwner, webResourcesController.update); // Apenas o dono pode atualizar
router.delete("/cifra/:resourcesId", isAuthenticated, isOwner, webResourcesController.destroy); // Apenas o dono pode deletar

// Rotas de Autenticação
router.get("/usuario/login", webUsuarioController.loginForm);
router.post("/usuario/login", webUsuarioController.login);
router.post("/usuario/logout", webUsuarioController.logout);

// Rotas de Usuário
router.get("/usuario", webUsuarioController.index);
router.get("/usuario/create", webUsuarioController.create);
router.post("/usuario", webUsuarioController.store);
router.get("/usuario/:id", webUsuarioController.show);
router.get("/usuario/:id/edit", isAuthenticated, webUsuarioController.edit); // Apenas usuários autenticados podem editar o perfil
router.get("/usuario/:id/editemailpassword", isAuthenticated, webUsuarioController.editEmailPassword); // Apenas usuários autenticados podem editar email e senha
router.put("/usuario/:id/editemailpassword", isAuthenticated, webUsuarioController.updateEmailPassword); // Apenas usuários autenticados podem atualizar email e senha
router.put("/usuario/:id", isAuthenticated, webUsuarioController.update); // Apenas usuários autenticados podem atualizar o perfil
router.delete("/usuario/:id", isAuthenticated, webUsuarioController.destroy); // Apenas usuários autenticados podem deletar o perfil

// Página inicial
router.get("/", async (request, response) => {
    const resources = await ResourcesModel.findAll();
    const usuario = request.session.usuario || null;
    response.render("index", { layout: "Layouts/main", title: "Página inicial", resources: resources, usuario: usuario });
});

module.exports = router;