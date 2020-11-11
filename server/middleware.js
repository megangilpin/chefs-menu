const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).json({ errors: ["Missing token"] });
            return;
        }
        const tokenObj = await jwt.verify(token, process.env.SECRET);
        if (!tokenObj) {
            res.status(401).json({ errors: ["Invalid token"] });
            return;
        }
        req.user = tokenObj;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ errors: ["Invalid token"] });
    }
};

module.exports = { loginRequired };
