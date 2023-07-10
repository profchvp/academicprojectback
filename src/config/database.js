import mysql from "mysql2";

// Conexao banco...
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "admin",
    database: "crm"
});

async function executeQuery(connection, query, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, (err, result) => {
             if (err) {
                 return reject(err);                 
             } else {
                return resolve(result);
             }             
        });
    });
 }

export {db, executeQuery};