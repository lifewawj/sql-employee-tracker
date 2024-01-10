-- If a db named 'employee_db' exist, drop that db aka remove it
DROP DATABASE IF EXISTS employee_db;

-- Create a db named 'employee_db'
CREATE DATABASE employee_db;

-- Use the employee_db
USE employee_db;

-- Tables created for department, role, employees
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    department_id INT,
    salary DECIMAL,

    PRIMARY KEY(id),

    FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,

    PRIMARY KEY(id),

    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,

    FOREIGN KEY(id) REFERENCES employee(manager_id) ON DELETE SET NULL
);