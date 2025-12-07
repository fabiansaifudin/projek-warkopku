const db = require('../config/config');

async function profile(id, callback) {
    if (id === undefined) {
        return callback({ message: "You have to login first" });
    }

    db.query("SELECT * FROM users JOIN profiles ON users.id = profiles.user_id WHERE users.id = "+id, function(err, row ) {
        if(err) return callback({ message: "Error msg: "+err });
        if (row != null) {
            return callback(null, row)
        } else {
            return callback({ message: "You have to login again" });
        }
    })
}

async function update(req, callback) {
    db.query("SELECT * FROM users JOIN profiles ON users.id = profiles.user_id WHERE users.id = "+id, function(err, row ) {
        if(err) return callback({ message: "Error msg: "+err });
        if (row != null) {
            const key = Object.keys(req.body);
            const value = Object.values(req.body);
            value.push(Date.now(), id)
            let sql = key.toString().replace(/,/g, "=?, ")
            db.query("UPDATE profiles SET "+sql+"=?, updated_at=? WHERE id = ?", value, function (err) {
                if (err) {
                    return callback({
                        message: "Error msg: "+err,
                    });
                }
                return callback(null, {
                    message: "Profiles updated"
                });
            })
            // return callback(null, row)
        } else {
            return callback({ message: "You have to login again" });
        }
    })
}

async function avatar(req, callback) {
    if (!req.file) {
        return callback({message: "Field is null"})
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.file;

        const picture = `${avatar.destination}/${avatar.filename}`;

        db.query("UPDATE profiles SET avatar=?, updated_at=? WHERE id = ?", [picture, Date.now(), req.params.id], function (err) {
            if (err) {
                return callback({
                    message: "Error msg: "+err,
                });
            }
            return callback(null, {
                message: "Avatar updated"
            });
        })

        //send response
        return callback(null, {
            name: avatar.originalname,
            mimetype: avatar.mimetype,
            size: avatar.size
        });
    }
}

async function removeAvatar(id, callback) {
    db.query("SELECT * FROM users JOIN profiles ON users.id = profiles.user_id WHERE users.id = "+id, function (err, row) {
        if (profile != null) {
            db.query("UPDATE profiles SET avatar=?, updated_at=? WHERE id = ?", ["assets/no-profile-picture-icon-15.jpg", Date.now(), req.params.id], function (err) {
                if (err) {
                    return callback({
                        message: "Error msg: "+err,
                    });
                }
                return callback(null, "Avatar remove")
            })
        } else {
            return callback({ message: "Data is not found" })
        }
    })
    // const profile = await Profile.findOne({ userId: id })

}

async function checkAuth(params, callback) {}

module.exports = {
    profile,
    update,
    avatar,
    removeAvatar,
    checkAuth
}