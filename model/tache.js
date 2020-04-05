var uuid = require('uuid');

// Classe qui permet de structurer une classe
class Tache {

    /**
     * Constructeur de la classe Tache
     * @param {String} titre Titre de la tache
     * @param {String} dateDebut Date de début de la tache
     * @param {String} dateFin Date de fin de la tache
     * @param {String} statut Statut de la tache
     * @param {String} tags Liste des catégories de la tache
     */
    constructor(titre, dateDebut, dateFin, statut, tags) {
        this.id = uuid.v4();
        this.titre = titre;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.statut = statut;
        this.tags = tags;
    }
}

module.exports = Tache;