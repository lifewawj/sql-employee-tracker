// NPM Packages needed
// Imported Express to create a server
const express = require("express");
// Imported inquirer to ask prompts and obtain user input
const inquirer = require('inquirer');
// Imported db const var (short for database) from connection.js
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


// An Array for the questions to be stored in and prompted towards the user
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


// A switch statement that takes in the user input on what choice they pick
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


// a function that views all departments
const viewAllDepartment = () => {
    // Makes a query to the database
    // Selecting the columns id & name (Renaming id AS department_id, and name AS department_names) from the departments Table
    db.query('SELECT id AS department_id, name AS department_names FROM departments', (err, results) => {
        // An If statement where if there is an error in making the query, log an Error
        if (err) {
            console.log(err);
        } else {
            // Displaying the result table in the terminal
            console.table(results);
            // Prompts the user again with the questions
            handleUserChoice();
        };
    });
};

// a function that views all roles
const viewAllRoles = () => {
    // Makes a query to the database
    // Selecting the columns title, id, department_id, salary (Renaming title AS job_title, id AS role_id) from the roles Table
    db.query('SELECT title AS job_title, id AS role_id, department_id, salary FROM roles', (err, results) => {
        // An If statement where if there is an error in making the query, log an Error
        if (err) {
            console.log(err);
        } else {
            // Displaying the result table in the terminal
            console.table(results);
            // Prompts the user again with the questions
            handleUserChoice();
        };
    });
};

// a function that views all employees
const viewAllEmployees = () => {
    // Stores the query string inside a const var
    const query = 'SELECT e.id AS employee_id, e.first_name, e.last_name, e.manager_id, r.department_id, r.salary FROM employees AS e INNER JOIN roles AS r ON e.role_id = r.id;'
    db.query(query, (err, results) => {
        // An If statement where if there is an error in making the query log an Error
        if (err) {
            console.log(err);
        } else {
            // Displaying the result table in the terminal
            console.table(results);
            // Prompts the user again with the questions
            handleUserChoice();
        };
    });
};





// a function that adds a department
const addDepartment = () => {
    // a function that prompts the user with a question about the department
    const promptDepartment = () => {
        const department = [
            {
                type: "input",
                name: "newDepartment",
                message: "What is the name of your Department?"
            },
        ];
        return inquirer.prompt(department);
    }
    // Calls the promptDepartment() function. After prompting the user the questions, Use the answers and...
    promptDepartment().then((answers) => {
        // Makes a query to the database inserting the values into the departments Table, using the answers from the user
        db.query("INSERT INTO departments (name) VALUES (?)", [answers.newDepartment], (err, results) => {
            // An If statement where if there is an error in making the query log an Error
            if (err) {
                console.log(err);
                return;
            };

            // Displaying the result table in the terminal
            console.log(`Added "${answers.newDepartment}" to the database`);
            // Prompts the user again with the questions
            handleUserChoice();
        });
    });
};




// a function that adds a role
const addRole = () => {
    // Making a query to fetch the id and name from departments table in the database
    db.query("SELECT id, name FROM departments", (err, departmentResults) => {
        // If there is an error retrieving the data return an error
        if (err) {
            console.log(err);
            return;
        };

        // A empty object for the departmentResults to be stored in, after making the query to fetch the current departments in the db
        const departmentIdList = {};

        // Within the departmentResults returning an array. For each result in the array known as department, 
        // Access the name of the role and use it as a key and storing its corresponding ID as a value in the departmentIdList
        departmentResults.forEach((department) => {
            departmentIdList[department.name] = department.id;
        });

        // a function that prompts the user with the Role questions
        const promptRole = () => {
            const role = [
                {
                    type: "input",
                    name: "newRole",
                    message: "What is the name of the role?"
                },
                {
                    type: "input",
                    name: "newSalary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department",
                    message: "Which department does the role belong to?",
                    choices: Object.keys(departmentIdList)
                },
            ];
            return inquirer.prompt(role);
        }

        // Calling the promptRole() function, using the answers and...
        promptRole().then((answers) => {
            // Uses the user's inputed answer as a key to see if there is a match in the departmentIdList object, storing it within a const var
            const departmentId = departmentIdList[answers.department];
            // Make a query to the database inserting the values into the roles table with the answers inputed from the user
            db.query("INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)", [answers.newRole, departmentId, answers.newSalary], (err, results) => {
                // An If statement where if there is an error in making the query log an Error
                if (err) {
                    console.log(err);
                    return;
                } else {
                    // Displaying the result table in the terminal
                    console.log(`Added "${answers.newRole}" to the database`);
                    // Prompts the user again with the questions
                    handleUserChoice();
                };
            });
        });
    });
};


// a function that adds an employee
const addEmployee = () => {
    // Makes a query selecting the id & title from the roles Table
    db.query("SELECT id, title FROM roles", (err, rolesResults) => {
        // An If statement where if there is an error in making the query, log an Error
        if (err) {
            console.log(err);
            return;
        };

        // An empty object for the rolesResults to be stored in, after making the query to fetch the current departments in the db
        const roleIdList = {}

        // Within the rolesResults returning an array. For each result in the array known as role,
        // Access the title of the role and use it as a key and storing its corresponding ID as a value in the roleIdlist
        rolesResults.forEach((role) => {
            roleIdList[role.title] = role.id;
        });

        // a function that prompts the Employee questions to the user
        const promptEmployee = () => {
            const newEmployee = [
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name?"
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role?",
                    choices: Object.keys(roleIdList)
                },
            ];
            return inquirer.prompt(newEmployee);
        }
        promptEmployee().then((answers) => {
            // Uses the user's inputed answer as a key to see if there is a match in the roleIdList object, storing it within a const var
            const roleId = roleIdList[answers.role];

            // Makes a query that inserts that values first_name, last_name, role_id from the user's input into the employees Table
            db.query("INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)", [answers.firstName, answers.lastName, roleId], (err, results) => {
                // An If statement where if there is an error in making the query, log an Error
                if (err) {
                    console.log(err);
                    return;
                } else {
                    // Displaying the result table in the terminal
                    console.log(`Added "${answers.firstName} ${answers.lastName}" to the database`);
                    // Prompts the user again with the questions
                    handleUserChoice();
                }
            });
        });
    });
};


// // a function that updates employee role
// const updateEmployeeRole = () => {
//     // prompts the Questions to the user to choose
//     const promptUpdate = () => {
//         const updateEmployee = [
//             {
//                 type: "list",
//                 name: "employee",
//                 message: "Which employee's role do you want to update?",
//                 choices: 
//             },
//             {
//                 type: "list",
//                 name: "role",
//                 message: "Which role do you want to assign the selected employee?",
//                 choices: 
//             }
//         ]
//         return inquirer.prompt(updateEmployee);
//     }
// }

// a function that Inits the app
function inits() {
    console.log("┌──────────────────┐");
    console.log("│ Employee Manager │");
    console.log("└──────────────────┘");

    handleUserChoice();
};


// Inits the app
inits();