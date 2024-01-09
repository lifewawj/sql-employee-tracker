-- If a db named 'employee_db' exist, drop that db aka remove it
DROP DATABASE IF EXISTS employee_db;

-- Create a db named 'employee_db'
CREATE DATABASE employee_db;

-- Use the employee_db
USE employee_db;

-- Tables created for department, role, employees
CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL
    department_id INT
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);