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


// a function that views all departments
const viewAllDepartment = () => {
    db.query('SELECT * FROM departments', (err, results) => {
        console.table(results);
        handleUserChoice();
    });
};

// a function that views all roles
const viewAllRoles = () => {
    db.query('SELECT * FROM roles', (err, results) => {
        if (err) {
            console.log(err)
        };

        console.table(results);
        handleUserChoice();
    });
};

// a function that views all employees
const viewAllEmployees = () => {
    const query = 'SELECT * FROM departments INNER JOIN roles ON departments.id = roles.department_id INNER JOIN employees ON roles.id = employees.id;'
    db.query(query, (err, results) => {
        if (err) {
            console.log(err)
        };

        console.table(results);
        handleUserChoice();
    });
};





// a function that adds a department
const addDepartment = () => {
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
    // prompts the user with the Department question
    promptDepartment().then((answers) => {

        db.query("INSERT INTO departments (name) VALUES (?)", [answers.newDepartment], (err, results) => {
            if (err) {
                console.log(err);
            };

            console.log(`Added "${answers.newDepartment}" to the database`);
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
        }

        const departmentIdList = {};
        departmentResults.forEach((department) => {
            departmentIdList[department.name] = department.id;
        });

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

        promptRole().then((answers) => {
            const departmentId = departmentIdList[answers.department];

            db.query("INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)", [answers.newRole, departmentId, answers.newSalary], (err, results) => {
                if (err) {
                    console.log(err);
                }

                console.log(`Added "${answers.newRole}" to the database`);
                handleUserChoice();
            });
        });
    });
};


// a function that adds an employee
const addEmployee = () => {
    db.query("SELECT id, title FROM roles", (err, rolesResults) => {
        if (err) {
            console.log(err);
            return;
        };
        const roleIdList = {}
        rolesResults.forEach((role) => {
            roleIdList[role.title] = role.id;
        });

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
            const roleId = roleIdList[answers.role];

            db.query("INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)", [answers.firstName, answers.lastName, roleId], (err, results) => {
                if (err) {
                    console.log(err);
                }

                console.log(`Added "${answers.firstName} ${answers.lastName}" to the database`);
                handleUserChoice();
            });
        });
    });
};


// a function that updates employee role
// const updateEmployeeRole = () => {

// };


// a function that Inits the app
function inits() {
    console.log("┌──────────────────┐");
    console.log("│ Employee Manager │");
    console.log("└──────────────────┘");

    handleUserChoice();
};


// Inits the app
inits();