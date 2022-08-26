module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING(100)
        },
        first_name: {
            type: Sequelize.STRING(50)
        },
        last_name: {
            type: Sequelize.STRING(50)
        },
        title: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        mobile: {
            type: Sequelize.STRING(20)
        },
        phone: {
            type: Sequelize.STRING(20)
        },
        birth_date: {
            type: Sequelize.DATEONLY,
        }
    });
    return User;
};