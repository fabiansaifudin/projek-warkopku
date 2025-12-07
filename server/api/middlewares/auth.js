const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {  
    const authHeader = req.headers['authorization'] 
    const token = authHeader && authHeader.replace('Bearer ', '') 

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "process.env.ACCESS_TOKEN", (err, payload) => {
        if (err) return res.sendStatus(403);
        req.user = payload;
        next();
    });
}

function generateAccessToken(data) {
    return jwt.sign(data, "process.env.ACCESS_TOKEN", {
        expiresIn: "1d",
    });
}

function refreshAccessToken(data) {
    return jwt.sign(data, "process.env.REFRESH_TOKEN", {
        expiresIn: "2d",
    })
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    refreshAccessToken,
};
