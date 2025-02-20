const ResourcesModel = require("../models/ResourcesModel");

class WebResourcesController {
    async index(req, res) {
        try {
            const message = req.session.message ? req.session.message : null;
            if (message) delete req.session.message;
            const resources = await ResourcesModel.findAll();
            const usuario = req.session.usuario || null;
            return res.render("index", { layout: "Layouts/main", title: "Index de Cifras", resources: resources, message: message, usuario: usuario, csrfToken: req.csrfToken() });
        } catch (error) {
            return res.render("index", { layout: "Layouts/main", title: "Index de Cifras", resources: [], message: ["danger", JSON.stringify(error)] });
        }
    }

    async create(req, res) {
        try {
            return res.render("Cifra/create", { layout: "Layouts/main", title: "Criar Cifra", csrfToken: req.csrfToken() });
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/");
    }

    async store(req, res) {
        try {
            const resources = new ResourcesModel();
            resources.nome = req.body.nome;
            resources.descricao = req.body.descricao;
            resources.usuarioId = req.session.usuario.id; // Adiciona o ID do usuário logado
            const result = await resources.save();
            req.session.message = ["success", `Cifra ${result.id}-${result.nome} salva com sucesso.`];
            return res.redirect("/");
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/");
    }

    async show(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourcesId);
            const usuarioAtual = req.session.usuario || null;
            if (resource) {
                return res.render("Cifra/show", { layout: "Layouts/main", title: "Mostrar Cifra", resource: resource, usuarioAtual: usuarioAtual });
            }
            req.session.message = ["warning", "Cifra não encontrada."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/");
    }

    async edit(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourcesId);
            if (resource) {
                return res.render("Cifra/edit", { layout: "Layouts/main", title: "Editar Cifra", resource: resource, csrfToken: req.csrfToken() });
            }
            req.session.message = ["warning", "Cifra não encontrada."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/");
    }

    async update(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourcesId);
            if (!resource) {
                req.session.message = ["warning", "Cifra não encontrada."];
                return res.redirect("/");
            }
            resource.nome = req.body.nome;
            resource.descricao = req.body.descricao;
            const result = await resource.update();
            req.session.message = ["success", `Cifra ${result.id}-${result.nome} atualizada com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/");
    }

    async destroy(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourcesId);
            if (!resource) {
                req.session.message = ["warning", "Cifra não encontrada."];
                return res.redirect("/");
            }
            const result = await resource.delete();
            req.session.message = ["success", `Cifra ${result.id}-${result.nome} removida com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/");
    }
}

module.exports = new WebResourcesController();