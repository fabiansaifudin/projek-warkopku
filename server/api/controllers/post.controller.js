const postService = require('../services/post.service');

exports.getAllPost = (req, res, next) => {
    postService.getPost((error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.getAllPostByUser = (req, res, next) => {
    postService.getPostByUser((error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
};

exports.postByUser = (req, res, next) => {
    postService.findPostByUser(req.params.user, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}

exports.postFind = (req, res, next) => {
    postService.findPost(req.params.id, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}

exports.postSave = (req, res, next) => {
    postService.postSave(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}

exports.postUpdate = (req, res, next) => {
    postService.postUpdate(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}

exports.postDelete = (req, res, next) => {
    postService.postDelete(req.params.id, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    })
}
