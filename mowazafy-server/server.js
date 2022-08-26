const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var bcrypt = require("bcryptjs");

const db = require("./app/models");
const Op = db.Sequelize.Op;
const Role = db.role;
const User = db.user;
db.sequelize.sync({ force: true }).then(() => {
    console.log({ message: 'Drop and Resync Db' });
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "inactive"
    });

    Role.create({
        id: 2,
        name: "employee"
    });

    Role.create({
        id: 3,
        name: "hr"
    });

    Role.create({
        id: 4,
        name: "admin"
    });

    Role.create({
        id: 5,
        name: "superadmin"
    });

    User.create({
        id: 1,
        username: "superadmin",
        password: bcrypt.hashSync("12345678", 8),
        first_name: "Mohamed",
        last_name: "Amr Mahdy",
        title: "Software Engineer",
        mobile: "01111111111",
        phone: "026000000",
        birth_date: '1998-11-4',
        email: "dev.mohamed.amr@outlook.com"
    }).then(user => {
        Role.findAll({
            where: {
                name: "superadmin"
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                console.log({ message: "User was registered successfully!" });
            });
        });
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Mowazafy API." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/test.routes')(app);
require('./app/routes/attendance.routes')(app);
require('./app/routes/employee.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log({ message: `Server is running on port ${PORT}.` });
});