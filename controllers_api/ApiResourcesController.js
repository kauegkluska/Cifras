const ResourcesModel = require("../models/ResourcesModel");

/**
 * Controlador para gerenciar recursos através de endpoints da API.
 * @class
 */
class ApiResourcesController {

    /**
     * Recupera todos os recursos.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os recursos.
     */
    async apiGetAll(req, res) {
        try {
            const resources = await ResourcesModel.findAll();
            return res.status(200).json(resources);
        } catch (error) {
            console.error("Error:", error);
            req.session.message = ["danger", error.message || "An unknown error occurred"];
        }
        
    }

    /**
     * Recupera um único recurso pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.resourceId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o recurso solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourceId);
            if(!resource)
                return res.status(404).json({ error: "Recurso não encontrado" });
            return res.status(200).json(resource);
        } catch (error) {
            console.error("Error:", error);
            req.session.message = ["danger", error.message || "An unknown error occurred"];
        }
        
    }

    /**
     * Armazena um novo recurso.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o recurso armazenado.
     */
    async apiStore(req, res) {
        try {
            const resource = new ResourcesModel();
            resource.nome = req.body.nome;         // Changed
            resource.descricao = req.body.descricao;   // Changed
            resource.Usuario_id = req.body.Usuario_id; // Changed
            const result = await resource.save();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error:", error);
            req.session.message = ["danger", error.message || "An unknown error occurred"];
        }
        
    }
    
    // ApiResourcesController.js (apiUpdate method)
    async apiUpdate(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourceId);
            if(!resource)
                return res.status(404).json({ error: "Recurso não encontrado" });
            resource.nome = req.body.nome;         // Changed
            resource.descricao = req.body.descricao;   // Changed
            resource.Usuario_id = req.body.Usuario_id; // Changed
            const result = await resource.update();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error:", error);
            req.session.message = ["danger", error.message || "An unknown error occurred"];
        }
        
    }

    /**
     * Atualiza um recurso existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.resourceId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o recurso atualizado.
     */
   
    /**
     * Exclui um recurso.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.resourceId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const resource = await ResourcesModel.findOne(req.params.resourceId);
            if(!resource)
                return res.status(404).json({ error: "Recurso não encontrado" });
            const result = await resource.delete();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error:", error);
            req.session.message = ["danger", error.message || "An unknown error occurred"];
        }
        
    }
}

module.exports = new ApiResourcesController();
