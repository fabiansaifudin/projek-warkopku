const commentService = require('../services/comment.service')

exports.getCommentByPost = (req, res, next) => {
    commentService.getCommentByPost(req.params.post, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}

exports.commentFind = (req, res, next) => {
    commentService.findComment(req.params.id, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.commentSave = (req, res, next) => {
    commentService.commentSave(req.body, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.commentUpdate = (req, res, next) => {
    commentService.commentUpdate(req, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.commentDelete = (req, res, next) => {
    commentService.commentSave(req.params.id, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}