const likeService = require('../services/like.service');

exports.getLikeByComment = (req, res, next) => {
    likeService.getLikeByComment(req.params.comment, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.likedByComment = (req, res, next) => {
    likeService.saveLikeByComment(req, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.unlikeByComment = (req, res, next) => {
    likeService.deleteLikeByComment(req, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}