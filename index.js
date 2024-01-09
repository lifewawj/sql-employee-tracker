// NPM Packages needed
const inquirer = require('inquirer');


// Create an array for the questions to be stored in and prompted towards the user
const generatePrompts = () => {
    questions = [
        {
            type: "list",
            name: "choices",
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


// a function that Inits the app
function inits() {
    console.log("┌──────────────────┐");
    console.log("│ Employee Manager │");
    console.log("└──────────────────┘");

    generatePrompts();
};


// Inits the app
inits();