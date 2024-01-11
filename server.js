// NPM Packages needed
const express = require("express");
const inquirer = require('inquirer');
const db = require("./config/connection.js");


const PORT = process.env.PORT || 3001; // Create a const var called 'PORT' and stores a place for the server to run on
const app = express(); // Create the express app by storing within an const var called 'app'

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Inits the app
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Create an array for the questions to be stored in and prompted towards the user
const generatePrompts = () => {
    questions = [
        {
            type: "list",
            name: "userInput",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Department",
                "Add Department",
                "Quit"
            ]
        },
    ]
    return inquirer.prompt(questions);
}


// create a switch statement that takes in the user input on what choice they pick
// returns the user choice(function) based on the one they picked
const handleUserChoice = async () => {
    const answer = await generatePrompts();
    const userChoice = answer.userInput;

    switch (userChoice) {
        case "View All Employees":
            viewAllEmployees();
            break;

        case "Add Employee":
            addEmployee();
            break;

        case "Update Employee Role":
            updateEmployeeRole();
            break;

        case "View All Roles":
            viewAllRoles();
            break;

        case "Add Role":
            addRole();
            break;

        case "View All Department":
            viewAllDepartment();
            break;

        case "Add Department":
            addDepartment();
            break;

        case "Quit":
            console.log("Bye Bye!");
            break;
    };
}




// create a function using the db, for every choice options
// a function that views all employees
const viewAllEmployees = () => {
    db.query('SELECT * FROM employees', (err, results) => {
        console.table(results);
        handleUserChoice();
    });
};


// a function that adds an employee
// const addEmployee = () => {
// };


// a function that updates employee role
// const updateEmployeeRole = () => {

// };


// a function that views all roles
const viewAllRoles = () => {
    db.query('SELECT * FROM roles', (err, results) => {
        console.table(results);
        handleUserChoice();
    });
};



// a function that adds a role
// const addRole = () => {

// };


// a function that views all departments
const viewAllDepartment = () => {
    db.query('SELECT * FROM departments', (err, results) => {
        console.table(results);
        handleUserChoice();
    });
};


// a function that adds a department
// const addDepartment = () => {

// };


// seperate the different choice options into a new js file to keep it more organized

// a function that Inits the app
function inits() {
    console.log("┌──────────────────┐");
    console.log("│ Employee Manager │");
    console.log("└──────────────────┘");

    handleUserChoice();
};


// Inits the app
inits();