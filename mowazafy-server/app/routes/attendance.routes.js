const { authJwt } = require("../middleware");
const controller = require("../controllers/attendance.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/attendance/",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.create
    );
    app.get(
        "/api/attendance/",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.findAll
    );
    app.get(
        "/api/attendance/:id",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.findOne
    );
    app.put(
        "/api/attendance/:id",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.update
    );
    app.delete(
        "/api/attendance/:id",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.delete
    );
    app.delete(
        "/api/attendance/",
        [authJwt.verifyToken, authJwt.isEmployee, authJwt.isSuperAdmin],
        controller.deleteAll
    );
    app.get(
        "/api/attendance/inside",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.findAllInside
    );
};