-- If a db named 'employee_db' exist, drop that db aka remove it
DROP DATABASE IF EXISTS employee_db;

-- Create a db named 'employee_db'
CREATE DATABASE employee_db;

-- Use the employee_db
USE employee_db;

-- Tables created for department, role, employees
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    department_id INT,
    salary DECIMAL,

FOREIGN KEY(department_id) 
REFERENCES department(id) 
ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,

    FOREIGN KEY(role_id) 
    REFERENCES role(id) 
    ON DELETE SET NULL
);