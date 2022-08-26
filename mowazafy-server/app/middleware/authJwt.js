const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isSuperAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "superadmin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require SuperAdmin Role!"
            });
            return;
        });
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin" || roles[i].name === "superadmin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isHR = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "hr" || roles[i].name === "superadmin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require HR Role!"
            });
        });
    });
};

isEmployee = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "employee" || roles[i].name === "superadmin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Employee Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isSuperAdmin: isSuperAdmin,
    isAdmin: isAdmin,
    isHR: isHR,
    isEmployee: isEmployee,
};
module.exports = authJwt;