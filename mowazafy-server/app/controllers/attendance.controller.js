const db = require("../models");
const User = db.user;
const Attendance = db.attendance;
exports.create = (req, res) => {
    User.findOne({
        where: {
            id: req.body.userId
        }
    }).then(user => {

        if (!user) {
            res.status(400).send({ message: "User not found!" });
            return;
        }

        if (!req.body.entryDate) {
            res.status(400).send({ message: "Entry Date can not be empty!" });
            return;
        }

        const attendance = {
            userId: req.body.userId,
            entryDate: req.body.entryDate,
            leaveDate: req.body.leaveDate ? req.body.leaveDate : null
        };

        Attendance.create(attendance)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while creating the attendance." });
            });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Attendance.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving attendance." });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Attendance.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find attendance with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving attendance with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Attendance.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Attendance was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update attendance with id=${id}. Maybe attendance was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating attendance with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Attendance.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Attendance was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete attendance with id=${id}. Maybe attendance was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete attendance with id=" + id });
        });
};

exports.deleteAll = (req, res) => {
    Attendance.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Attendances were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while removing all Attendances." });
        });
};

exports.findAllInside = (req, res) => {
    Attendance.findAll({ where: { leaveDate: null } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving attendance." });
        });
};