-- Department Table (data)
INSERT INTO departments (id, name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal'),
       (5, 'Service');



-- Role Table (data)
INSERT INTO roles (id, title, department_id, salary)
VALUES (1, 'Sales Lead', 1, 100000),
       (2, 'Salesperson', 1, 80000),
       (3, 'Lead Engineer', 2, 150000),
       (4, 'Software Engineer', 2, 120000),
       (5, 'Account Manager', 3, 160000),
       (6, 'Accountant', 3, 125000),
       (7, 'Legal Team Lead', 4, 250000),
       (8, 'Lawyer', 4, 190000);



-- Employee Table (data)
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, null),
       (2, 'Mike', 'Chan', 2, 1),
       (3, 'Ashley', 'Rodriguez', 3, null),
       (4, 'Kevin', 'Tupik', 4, 3),
       (5, 'Kunal', 'Singh', 5, null),
       (6, 'Malia', 'Brown', 6, 5),
       (7, 'Sarah', 'Lourd', 7, null),
       (8, 'Tom', 'Allen', 8, 7);
