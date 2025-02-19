const ResourcesModel = require("../models/ResourcesModel");

class WebResourcesController {
    /**
    * Mostra uma tela com todos os recursos
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async index(req, res) {
        try {
            const message = req.session.message ? req.session.message : null;
            if (message) delete req.session.message;
            const resources = await ResourcesModel.findAll();
            return res.render("Resources/index", { layout: "Layouts/main", title: "Index de Resources", resources: resources, message: message, csrfToken: req.csrfToken() });
        } catch (error) {
            return res.render("Resources/index", { layout: "Layouts/main", title: "Index de Resources", resources: [], message: ["danger", JSON.stringify(error)] });
        }
    }

    /**
    * Mostra um formulário para criação de um novo recurso
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async create(req, res) {
        try {
            return res.render("Resources/create", { layout: "Layouts/main", title: "Create de resources", csrfToken: req.csrfToken() });
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/resources");
    }

    /**
    * Salva um novo recurso no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async store(req, res) {
        try {
            const resources = new ResourcesModel();
            resources.nome = req.body.nome;
            resources.descricao = req.body.descricao;
            const result = await resources.save();
            req.session.message = ["success", `resources ${result.id}-${result.descricao} salvo com sucesso.`];
            return res.redirect("/resources");
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/resources");
    }

    /**
    * Mostra um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.resourcesId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        try {
            const resources = await ResourcesModel.findOne(req.params.resourcesId);
            if (resources) {
                return res.render("Resources/show", { layout: "Layouts/main", title: "Show de resources", resources: resources });
            }
            req.session.message = ["warning", "resources não encontrado."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/resources");
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.resourcesId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        try {
            const resources = await ResourcesModel.findOne(req.params.resourcesId);
            if (resources) {
                return res.render("Resources/edit", { layout: "Layouts/main", title: "Show de resources", resources: resources, csrfToken: req.csrfToken() });
            }
            req.session.message = ["warning", "resources não encontrado."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/resources");
    }

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.resourcesId Parâmetro passado pela rota do express
    */
    async update(req, res) {
        try {
            const resources = await ResourcesModel.findOne(req.params.resourcesId);
            if (!resources) {
                req.session.message = ["warning", "resources não encontrado."];
                return res.redirect("/resources");
            }
            resources.nome = req.body.nome;
            resources.descricao = req.body.descricao;
            const result = await resources.update();
            req.session.message = ["success", `resources ${result.id}-${result.descricao} atualizado com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/resources");
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.resourcesId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        try {
            const resources = await ResourcesModel.findOne(req.params.resourcesId);
            if (!resources) {
                req.session.message = ["warning", "resources não encontrado."];
                return res.redirect("/resources");
            }
            const result = await resources.delete();
            req.session.message = ["success", `resources ${result.id}-${result.descricao} removido com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/resources");
    }
}

module.exports = new WebResourcesController();