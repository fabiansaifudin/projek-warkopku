const profileService = require('../services/user.service');

exports.profile = (req, res, next) => {
    // return res.status(200).json({ message: "Authorized User!!", data: req.header });
    const { userId } = req.user;

    profileService.profile(userId, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.update = (req, res, next) => {
    // req.body.userId = req.params.id;

    profileService.update(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "User is updated",
            data: result
        })
    })
}

exports.avatar = (req, res, next) => {
    profileService.avatar(req, (error, result) => {
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
    profileService.removeAvatar(req.params.id, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}

exports.checkAuth = (req, res, next) => {
    profileService.checkAuth(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}
