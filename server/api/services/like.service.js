const db = require('../config/config')

async function getLikeByComment(comment_id, callback) {
    db.query("SELECT c.id, c.user_id AS comment_user_id, l.user_id AS like_user_id FROM comments AS c JOIN likes AS l ON c.id = l.comment_id WHERE c.id="+comment_id, function (error, result) {
        if (result !== null) {
            return callback(null, result);
        } else {
            return callback(null, { message: "No like" });
        }
    })
    // db.query("SELECT * FROM comments", function (err, res) {
    //     if (res !== null) {
    //         db.query("SELECT c.id, c.user_id AS comment_user_id, l.user_id AS like_user_id FROM comments AS c JOIN likes AS l ON c.id = l.comment_id WHERE c.id="+res.id, function (error, result) {
    //             res.like = result
    //             return callback(null, res);
    //         })
    //     } else {
    //         return callback({ message: "Comment not found" })
    //     }
    // });
}

async function saveLikeByComment(req, callback) {
    db.query("INSERT INTO likes (user_id, comment_id) VALUES ?", [req.params.user, req.params.comment], function (err, res) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        return callback(null, {
            message: "Liked"
        });
    })
}

async function deleteLikeByComment(req, callback) {
    db.query("DELETE FROM likes WHERE comment_id = "+req.params.comment+" AND user_id = "+req.params.user, function(err) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        return callback(null, {
            message: "Unlike"
        });
    })
}

module.exports = {
    getLikeByComment,
    saveLikeByComment,
    deleteLikeByComment
}