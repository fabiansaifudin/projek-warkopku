const db = require("../config/config")

async function upload(req, callback) {
    if (!req.file) {
        return callback({message: "Field is null"})
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let image = req.file;

        const imageFile = `${image.destination}/${image.filename}`;

        db.query("INSERT INTO media (name, ext, path, created_at, updated_at) VALUES ?", [image.filename, image.mimeType, imageFile, Date.now(), Date.now()], function (err, res) {
            if (err) {
                return callback({
                    message: "Error msg: "+err,
                });
            }
            return callback(null, {
                message: "Image updated"
            });
        })

        //send response
        return callback(null, {
            name: image.originalname,
            mimetype: image.mimetype,
            size: image.size
        });
    }
}

async function remove(id, callback) {
    db.query("SELECT * FROM media WHERE id = "+id, function (err, row) {
        if (err) {
            return callback({
                message: "Error msg: "+err,
            });
        }
        return callback(null, {
            message: "Image deleted"
        });
    })
}

module.exports = {
    upload,
    remove
}