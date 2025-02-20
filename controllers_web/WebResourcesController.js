const ResourcesModel = require("../models/ResourcesModel");

class WebResourcesController {
    async index(req, res) {
        try {
            const message = req.session.message ? req.session.message : null;
            if (message) delete req.session.message;
            const resources = await ResourcesModel.findAll();
            return res.render("Resources/index", { layout: "Layouts/main", title: "Index de Cifras", resources: resources, message: message, csrfToken: req.csrfToken() });
        } catch (error) {
            return res.render("Resources/index", { layout: "Layouts/main", title: "Index de Cifras", resources: [], message: ["danger", JSON.stringify(error)] });
        }
    }

    async create(req, res) {
        try {
            return res.render("Resources/create", { layout: "Layouts/main", title: "Criar Cifra", csrfToken: req.csrfToken() });
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/cifra");
    }

    async store(req, res) {
        try {
            const resources = new ResourcesModel();
            resources.nome = req.body.nome;
            resources.descricao = req.body.descricao;
            const result = await resources.save();
            req.session.message = ["success", `Cifra ${result.id}-${result.nome} salva com sucesso.`];
            return res.redirect("/cifra");
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/cifra");
    }

    async show(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourcesId);
            if (resource) {
                return res.render("Cifra/show", { layout: "Layouts/main", title: "Mostrar Cifra", resource: resource, usuarioAtual: req.session.usuario });
            }
            req.session.message = ["warning", "Cifra não encontrada."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/cifra");
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
        return res.redirect("/cifra");
    }

    async update(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourcesId);
            if (!resource) {
                req.session.message = ["warning", "Cifra não encontrada."];
                return res.redirect("/cifra");
            }
            resource.nome = req.body.nome;
            resource.descricao = req.body.descricao;
            const result = await resource.update();
            req.session.message = ["success", `Cifra ${result.id}-${result.nome} atualizada com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/cifra");
    }

    async destroy(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourcesId);
            if (!resource) {
                req.session.message = ["warning", "Cifra não encontrada."];
                return res.redirect("/cifra");
            }
            const result = await resource.delete();
            req.session.message = ["success", `Cifra ${result.id}-${result.nome} removida com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/cifra");
    }
}

module.exports = new WebResourcesController();