-- If a db named 'employee_db' exist, drop that db aka remove it
DROP DATABASE IF EXISTS employee_db;

-- Create a db named 'employee_db'
CREATE DATABASE employee_db;

-- Use the employee_db
USE employee_db;

-- Tables created for departments, roles, employees
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    department_id INT,
    salary DECIMAL(10,2),
    
    FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE SET NULL,
    FOREIGN KEY(manager_id) REFERENCES employees(id) ON DELETE SET NULL
);