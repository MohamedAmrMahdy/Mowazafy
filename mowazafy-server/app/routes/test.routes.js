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
    app.get("/api/test/all", controller.allAccess);
    app.get(
        "/api/test/employee",
        [authJwt.verifyToken, authJwt.isEmployee],
        controller.employeeBoard
    );
    app.get(
        "/api/test/hr",
        [authJwt.verifyToken, authJwt.isHR],
        controller.hrBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
    app.get(
        "/api/test/superadmin",
        [authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.adminBoard
    );
};