const { authJwt } = require("../middleware");
const controller = require("../controllers/employee.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/employee/",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.findAll
    );
    app.get(
        "/api/employee/:id",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.findOne
    );
    app.put(
        "/api/employee/:id",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.update
    );
    app.delete(
        "/api/employee/:id",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.delete
    );
    app.delete(
        "/api/employee/",
        [authJwt.verifyToken, authJwt.isEmployee, authJwt.isSuperAdmin],
        controller.deleteAll
    );
};