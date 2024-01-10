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


// create a switch statement that takes in the user input on what choice they pick
// returns the user choice(function) based on the one they picked
const userChoice = (choice) => {
    if (choice !== "Quit")
        switch (choice) {
            case "View All Employees":
                return

            case "Add Employee":
                return

            case "Update Employee Role":
                return

            case "View All Roles":
                return

            case "Add Role":
                return

            case "View All Department":
                return

            case "Add Department":
                return

            default:
                return "";
        }
};



// create a function using the db, for every choice options






// seperate the different choice options into a new js file to keep it more organized






// a function that Inits the app
function inits() {
    console.log("┌──────────────────┐");
    console.log("│ Employee Manager │");
    console.log("└──────────────────┘");

    generatePrompts();
};


// Inits the app
inits();