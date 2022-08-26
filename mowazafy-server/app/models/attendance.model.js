module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendances", {
        entryDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        leaveDate: {
            type: Sequelize.DATE,
        },
        blacklisted: {
            type: Sequelize.BOOLEAN,
        },
    });
    return Attendance;
};