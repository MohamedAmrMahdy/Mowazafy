const db = require("../models");
const User = db.user;

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "User was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete user with id=${id}. Maybe user was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete user with id=" + id });
        });
};

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {
            username: {
                [Op.not]: 'superadmin'
            }
        },
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while removing all Users." });
        });
};


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.employeeBoard = (req, res) => {
    res.status(200).send("Employee Content.");
};
exports.hrBoard = (req, res) => {
    res.status(200).send("HR Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.superadminBoard = (req, res) => {
    res.status(200).send("SuperAdmin Content.");
};