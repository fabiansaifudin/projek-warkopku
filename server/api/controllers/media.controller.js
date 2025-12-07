const mediaService = require('../services/media.service');

exports.avatar = (req, res, next) => {
    mediaService.upload(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "File is uploaded",
            data: result
        })
    })
}

exports.deleteAvatar = (req, res, next) => {
    mediaService.remove(req.params.id, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}