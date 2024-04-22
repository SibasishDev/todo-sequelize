
const user = require("./user");

function initModels(sequelize, Sequelize){
    const User = user(sequelize, Sequelize);

    return {User};
}

module.exports = initModels;