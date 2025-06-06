const mysql=require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "StoreApp",
    password: "root",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
  });
  
  module.exports = pool;
  