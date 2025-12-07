const db = require('../config/config')

async function getPost(callback) {
    db.query("SELECT * FROM posts", function (err, row) {
        if (row !== null) {
            return callback(null, row);
        } else {
            return callback(null, { message: "Empty" })
        }
    })
}

async function getPostByUser(callback) {
    db.query("SELECT * FROM posts", function (err, row) {
        if (row !== null) {
            db.query("SELECT u.id, u.name, u.username, u.email, p.name AS title, p.content, p.is_published, p.created_at, p.updated_at FROM users AS u JOIN posts AS p ON u.id = p.user_id WHERE u.id = "+row.user_id, function (er, ro) {
                row.user = ro;
                return callback(null, row);
            })
        } else {
            return callback(null, { message: "Empty" })
        }
    })
}

async function findPost(id, callback) {
    db.query("SELECT * FROM posts WHERE id="+id, function (err, row) {
        if (row !== null) {
            return callback(null, row);
        } else {
            return callback(null, { message: "Content not found" })
        }
    })
}

async function findPostByUser(user, callback) {
    db.query("SELECT * FROM users WHERE username="+user, function (err, row) {
        if (row !== null) {
            db.query("SELECT users.id, users.name, users.username, users.email, posts.id, posts.name, posts.content, posts.is_published, posts.user_id AS pivot_user, posts.created_at, posts.updated_at FROM users JOIN posts ON users.id = posts.user_id WHERE users.id = "+row.id, function(err, result) {
                row.posts = result
                return callback(null, row)
            })
        } else {
            return callback(null, { message: "Username not found" })
        }
    })
}

async function postSave(params, callback) {
    let dataInput = [];
    dataInput += [params.name, params.content, params.is_published, params.user_id, Date.now(), Date.now()]
    db.query("INSERT INTO posts (name, content, is_published, user_id, created_at, updates_at) VALUES ?", dataInput, function (err, result) {
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

async function postUpdate(req, callback) {
    const id = req.params.id;
    db.query("SELECT * FROM posts WHERE id="+id, function (err, row) {
        if (row != null) {
            const key = Object.keys(req.body);
            const value = Object.values(req.body);
            value.push(Date.now(), id)
            let sql = key.toString().replace(/,/g, "=?, ")
            db.query("UPDATE posts SET "+sql+"=?, updated_at=? WHERE id = ?", value, function(err) {
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

async function postDelete(id, callback) {
    db.query("DELETE FROM posts WHERE id = "+id, function(err) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        return callback(null, {
            message: "Content deleted"
        });
    })
}

module.exports = {
    getPost,
    getPostByUser,
    findPost,
    findPostByUser,
    postSave,
    postUpdate,
    postDelete
}