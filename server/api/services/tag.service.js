const db = require('../config/config')

async function getTag(callback) {
    db.query("SELECT * FROM tags", function (err, row) {
        if (row !== null) {
            return callback(null, row);
        } else {
            return callback(null, { message: "Empty" })
        }
    })
}

async function findTag(id, callback) {
    db.query("SELECT * FROM tags WHERE id="+id, function (err, row) {
        if (row !== null) {
            return callback(null, row);
        } else {
            return callback(null, { message: "Content not found" })
        }
    })
}

async function tagSave(params, callback) {
    let dataInput = [];
    dataInput += [params.name, Date.now(), Date.now()]
    db.query("INSERT INTO tags (name, created_at, updates_at) VALUES ?", dataInput, function (err, result) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        return callback(null, {
            message: "Content saved!"
        });
    })
}

async function tagUpdate(req, callback) {
    const id = req.params.id;
    db.query("SELECT * FROM tags WHERE id="+id, function (err, row) {
        if (row != null) {
            const key = Object.keys(req.body);
            const value = Object.values(req.body);
            value.push(Date.now(), id)
            let sql = key.toString().replace(/,/g, "=?, ")
            db.query("UPDATE tags SET "+sql+"=?, updated_at=? WHERE id = ?", value, function(err) {
                if (err) {
                    return callback({
                        message: "Error msg: "+err,
                    });
                }
                return callback(null, {
                    message: "Content updated"
                });
            })
        } else {
            return callback({ message: "Data not found" });
        }
    })
}

async function tagDelete(id, callback) {
    db.query("DELETE FROM tags WHERE id = "+id, function(err) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        return callback(null, {
            message: "Tag deleted"
        });
    })
}

module.exports = {
    getTag,
    findTag,
    tagSave,
    tagUpdate,
    tagDelete
}