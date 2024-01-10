// Import mysql2
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'cozySQL2023',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

console.log(db);

// Export the db connection
module.exports = db;