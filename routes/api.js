const express = require("express");
const apiResourcesController = require("../controllers_api/ApiResourcesController")
const router = express.Router();



// Rotas de Resources
// Rotas de TipoProduto
router.get("/api/resources", apiResourcesController.apiGetAll); // Devolver todos os resourcess no formato JSON
router.get("/api/resources/:resourcesId", apiResourcesController.apiGetOne); // Devolver um resources no formato JSON
router.post("/api/resources", apiResourcesController.apiStore); // Armazenar um resources
router.put("/api/resources/:resourcesId", apiResourcesController.apiUpdate); // Atualizar um resources
router.delete("/api/resources/:resourcesId", apiResourcesController.apiDestroy); // Remover um resources



module.exports = router;