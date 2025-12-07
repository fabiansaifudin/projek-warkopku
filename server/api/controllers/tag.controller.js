const tagService = require('../services/tag.service');

exports.getTag = (req, res, next) => {
    tagService.getTag((error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.findTag = (req, res, next) => {
    tagService.findTag(req.params.id, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.saveTag = (req, res, next) => {
    tagService.saveTag(req.body, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.updateTag = (req, res, next) => {
    tagService.tagUpdate(req, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.unlikeByComment = (req, res, next) => {
    tagService.tagDelete(req.params.id, (error, result) => {
        if (error) return next(error);
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}