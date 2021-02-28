const Sequelize = require('sequelize');

module.exports = (app) => {
  const dbconfiguration = app.configuration['development'];
  const sequelize = new Sequelize(dbconfiguration.database, dbconfiguration.username, dbconfiguration.password, {
    host: dbconfiguration.host,
    dialect: dbconfiguration.dialect,
    port: dbconfiguration.port
  });

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully with database: ' + dbconfiguration.database);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const db = {
    User: require('./user')(sequelize, Sequelize.DataTypes)
  };

  // console.log(dbconfiguration.database, 
  //     dbconfiguration.username, 
  //     dbconfiguration.password, 
  //     dbconfiguration.host, dbconfiguration.dialect);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}