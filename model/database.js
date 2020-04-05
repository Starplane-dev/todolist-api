var mysql = require('mysql');

var connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todolist"
});

connexion.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    init();
});

function init(){
    connexion.query("USE todolist;", function (err, result) {
        if (err) {
            return console.error(err.message);
        }
    });
}

module.exports = {
    getAll: function(callback) {
        connexion.query("SELECT * FROM tache;", function (err, result) {
            if (err) {
                throw err.message;
            }
            return callback(result);
        });
    },

    getById: function(id, callback) {
        var sql = "SELECT * FROM tache WHERE tache_id = " + mysql.escape(id);
        connexion.query(sql, (err, result, fields) => {
            if (err) {
                throw err.message;
            }
            return callback(result);
        });
    },

    deleteById: function(id, callback) {
        var sql = "DELETE FROM tache WHERE tache_id = " + mysql.escape(id);
        connexion.query(sql, (err, result, fields) => {
            if (err) {
                throw err.message;
            }
            return callback(result);
        });
    },

    addTask: function(tache, callback) {
        var sql = "INSERT INTO tache VALUES(?, ?, ?, ?, ?, ?)";
        var param = [tache.id, tache.titre, tache.dateDebut, tache.dateFin, tache.statut, tache.tags];
        connexion.query(sql, param, (err, result, fields) => {
            if (err) {
              throw err.message;
            }
            return callback(result);
          });
    },

    updateById: function(tache, callback) {
        let sql = 'UPDATE tache SET tache_titre = ?, tache_debut = ?, tache_fin = ?, tache_statut = ?, tache_tags = ?  WHERE tache_id = ?';
        var param = [tache.titre, tache.dateDebut, tache.dateFin, tache.statut, tache.tags, tache.id];
        connexion.query(sql, param, (err, result, fields) => {
            if (err){
                throw err.message;
            }
            return callback(result);
          });
    }
}
