const DataBase = require("../database/DataBase");

class ResourcesModel {
    /** 
     * Os atributos da classe Model precisam ser correspondentes às colunas do banco de dados.
     */
    id = null;
    descricao = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor da Classe ResourcesModel
     * @param {Resources}     resources     O objeto de entrada é simples (precisa conter apenas chave e valor, sem métodos) e precisa conter as chaves: id, descricao, dataAtualizacao e dataCriacao. Esses campos são as colunas da tabela no banco de dados. Caso não passe um objeto com esses campos, um model vazio será criado.
     */
    constructor(resources) {
        if (resources &&
            "id" in resources &&
            "nome" in resources &&
            "descricao" in resources &&
            "dataAtualizacao" in resources &&
            "dataCriacao" in resources
        ) {
            this.id = resources.id;
            this.nome = resources.nome
            this.descricao = resources.descricao;
            this.dataAtualizacao = resources.dataAtualizacao;
            this.dataCriacao = resources.dataCriacao;
        }
    }

    /**
     * Busca um objeto ResourcesModel no banco de dados
     * @param  {Number}               id      ID do tipoProdudo a ser procurado no banco de dados.
     * @return {ResourcesModel}             Retorna um objeto ResourcesModel com as informações encontradas, caso não encontre, retorna null.
     */
    static async findOne(id) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM resources WHERE resources.id = ?`, [id]);
        if (result && result.length == 1)
            return new ResourcesModel(result[0]);
        return null;
    }

    /**
     * Busca todos objetos ResourcesModel no banco de dados.
     * @return {[ProdutoModel, ...]} Retorna um array com objetos ResourcesModel que contém apenas as informações encontradas, caso não encontre, retorna um array vazio [].
     */
    static async findAll() {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM resources`);
        if (result && result.length > 0) {
            // Transforma um array de resources [resources, ...] em uma array de ResourcesModel [ResourcesModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new ResourcesModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
     * Salva um objeto ResourcesModel no banco de dados. O atributo que deve ser informado: "descricao". Os atributos: "id" "dataAtualizacao" e "dataCriacao" são criados automaticamente.
     * @returns {ResourcesModel} Retorna um objeto ResourcesModel com as informações recém inseridas no banco de dados.
     */
    async save() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`INSERT INTO resources VALUES (id, ?, ?, ?, ?);`,
            [   
                this.nome,
                this.descricao,
                timestamp,
                timestamp
                
            ]
        );
        const resources = await ResourcesModel.findOne(result.insertId);
        return resources;
    }

    /**
     * Atualiza um objeto ResourcesModel no banco de dados. O atributo que deve ser informado: "descricao". O atributo: "dataAtualizacao" é atualizado automaticamente. Os atributos: "id" e "dataCriacao" não são alterados.
     * @returns {ResourcesModel} Retorna um objeto ResourcesModel com as informações atualizadas no banco de dados.
     */
    async update() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`UPDATE resources
                                                       SET 
                                                            nome = ?,
                                                            descricao = ?,
                                                           dataAtualizacao = ?
                                                       WHERE resources.id = ?`,
            [   
                this.nome,
                this.descricao,
                timestamp,
                this.id
            ]
        );
        const resources = await ResourcesModel.findOne(this.id);
        return resources;
    }

    /**
     * Deleta um objeto ResourcesModel no banco de dados.
     * @returns {ResourcesModel} Retorna um objeto ResourcesModel com as informações removidas banco de dados.
     */
    async delete() {
        const result = await DataBase.executeSQLQuery(`DELETE FROM resources WHERE resources.id = ?`, [this.id]);
        return this;
    }
}

module.exports = ResourcesModel;
