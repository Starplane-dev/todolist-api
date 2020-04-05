var Tache = require('./model/tache.js');
var database = require('./model/database.js');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Configuration de l'application
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

// Gestion du filtre pour statut et tags
app.get('/taches', (req, res) => {
    console.log("arrivé a /taches !")
    var todolist = [];
    database.getAll(function(result){
        console.log("requete faite")
        result.forEach(elt => {
            var tache = new Tache(
                elt.tache_titre, 
                gestionDate(elt.tache_debut), 
                gestionDate(elt.tache_fin), 
                elt.tache_statut, 
                elt.tache_tags);
            tache.id = elt.tache_id;
            todolist.push(tache);
        });
        res.status(200);
        console.log("juste avant envoi")
        res.send(JSON.stringify(todolist));
    });
});

// Récupération d'une tache (via id)
app.get('/tache/:id', (req, res) => {
    var tacheARecup;
    if (req.params.id != '') {
        database.getById(req.params.id, function(result){
            var tache;
            result.forEach(elt => {
                tache = new Tache(
                    elt.tache_titre, 
                    gestionDate(elt.tache_debut), 
                    gestionDate(elt.tache_fin), 
                    elt.tache_statut, 
                    elt.tache_tags);
                tache.id = elt.tache_id;
            });
            res.status(200);
            res.send(JSON.stringify(tache, null, '\t')); 
        });
    }
});

// Création d'une tâche
app.post('/tache/', (req, res) => {
    if(req.body.titre != '') {

        // Vérification des dates saisies
        var dateDeb = new Date(req.body.dateDebut).getTime();
        var dateFin = new Date(req.body.dateFin).getTime();
        if(dateDeb < dateFin) {
            var tache = new Tache(req.body.titre, req.body.dateDebut, req.body.dateFin, req.body.statut, req.body.tags);
            database.addTask(tache, function(result){
                res.status(201);
                res.send(JSON.stringify("La tâche "+ req.body.titre + " a bien été créée."));
            });
        } else {
            res.status(400);
            res.send(JSON.stringify("La date de début doit être antérieure à la date de fin"));
        }
    }
});

// Modification d'une tâche (id en paramètre)
app.put('/tache/:id', (req, res) => {
    if(req.params.id != '') {

        // Vérification des dates saisies
        var dateDeb = new Date(req.body.dateDebut).getTime();
        var dateFin = new Date(req.body.dateFin).getTime();
        if(dateDeb < dateFin) {
            var tache = new Tache(
                req.body.titre, 
                req.body.dateDebut, 
                req.body.dateFin, 
                req.body.statut, 
                req.body.tags);
            tache.id = req.params.id;

            database.updateById(tache, function(){
                res.status(201);
                res.send(JSON.stringify("La tâche "+ req.body.titre + " a bien été modifiée."));
            });
        } else {
            res.status(400);
            res.send(JSON.stringify("La date de début doit être antérieure à la date de fin"));
        }
    }
});

// Suppression d'une tache (id en paramètre)
app.delete('/tache/:id', (req, res) => {
    if (req.params.id != '') {
        database.deleteById(req.params.id, function(){
            res.status(200);
            res.send(JSON.stringify("La tâche "+ req.params.id + "a bien été créé."));
        });
    }
});

app.listen(8080);



gestionDate = function(date){
    var day = date.getDate();
    var month = date.getMonth();
    var year = date .getFullYear();

    if(month < 9) {
        month = '0'+(month+1);
    }
    if(day < 10) {
        day = '0'+day;
    }

    return(year + "-" + month + "-" + day);
}