const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME,
    process.env.PASSWORD,{
        host : process.env.HOST,
        dialect : process.env.DIALECT,
        pool : {
            max : 10,
            min : 5,
            acquire : process.env.DB_POOL_ACQUIRE,
            idle : process.env.DB_POOL_IDLE
        }
    });

    ( async () => {
        try{
            await sequelize.authenticate();
            console.log("Connection has been established successfully");
        }catch(e){
            console.log("Unable to connect to the database");
        }
    })();

    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.sequelize.sync({ force: false })
    .then(() => console.log("re-sync done."));

    db.models = initModel.initModels(sequelize, Sequelize);


    module.exports = db;