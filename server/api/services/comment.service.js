const db = require('../config/config');

async function getCommentByPost(post_id, callback) {
    db.query("SELECT p.id AS post_id, c.id AS comment_id, c.user_id AS user_id, c.comment AS comment, c.updated_at AS last_update FROM posts AS p JOIN comments AS c ON p.id = c.post_id WHERE p.id = "+post_id, function (err, row) {
        if (row !== null) {
            result.comment = row
            db.query("SELECT u.id, u.name, u.email, cm.id, cm.user_id, cm.post_id, cm.comment, cm.updated_at FROM users AS u JOIN comments AS cm ON cm.user_id = u.id WHERE u.id = "+row.user_id, function (er, ro) {
                row.user = ro
                return callback(null, result);
            })
        } else {
            return callback(null, { message: "No comment" })
        }
    });
}

async function findComment(id, callback) {
    db.query("SELECT * FROM comments WHERE id = "+id, function (err, row) {
        if (row != null) {
            return callback(null, row)
        } else {
            return callback({ message: "Data not found" })
        }
    })
}

async function commentSave(req, callback) {
    let dataInput = [];
    dataInput += [req.user_id, req.post_id, req.comment, Date.now(), Date.now()]
    db.query("INSERT INTO comments (user_id, post_id, comment, created_at, updated_at) VALUES ?", dataInput, function (err, res) {
        if (err) {
            return callback({
                message: "Error msg: "+err
            });
        }
        return callback(null, {
            message: "Content saved!"
        });
    })
}

async function commentUpdate(req, callback) {
    const id = req.params.id;
    db.query("SELECT * FROM comments WHERE id="+id, function (err, row) {
        if (row != null) {
            const key = Object.keys(req.body);
            const value = Object.values(req.body);
            value.push(Date.now, id)
            let sql = key.toString().replace(/,/g, "=?, ")
            db.query("UPDATE comments SET "+sql+"=?, updated_at=? WHERE id = ?", value, function(err) {
                if (err) {
                    return callback({
                        message: "Error msg: "+err,
                    });
                }
                return callback(null, {
                    message: "Comment updated"
                });
            })
        } else {
            return callback({ message: "Data not found" });
        }
    });
}

async function commentDelete(id, callback) {
    db.query("DELETE FROM comments WHERE id = "+id, function(err) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        return callback(null, {
            message: "Comment deleted"
        });
    })
}

module.exports = {
    getCommentByPost,
    findComment,
    commentSave,
    commentUpdate,
    commentDelete
};