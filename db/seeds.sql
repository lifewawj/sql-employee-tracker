-- Department Table (data)
INSERT INTO department (id, name)
VALUES (1, "Sales"),

       (2, "Engineering"),

       (3, "Finance"),

       (4, "Legal");



-- Role Table (data)
INSERT INTO role (id, title, department_id, salary)
VALUES (1, "Sales Lead", "Sales", 100000),

       (2, "Salesperson", "Sales", 80000),

       (3, "Lead Engineer", "Engineering", 150000),

       (4, "Software Engineer", "Engineering", 120000),

       (5, "Account Manager", "Finance", 160000),

       (6, "Accountant", "Finance", 125000),

       (7, "Legal Team Lead", "Legal", 250000),

       (8, "Lawyer", "Legal", 190000);



-- Employee Table (data)
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", "Sales Lead", null),

       (2, "Mike", "Chan", "Salesperson", "John Doe"),

       (3, "Ashley", "Rodriguez", "Lead Engineer", null),

       (4, "Kevin", "Tupik", "Software Engineer", "Ashley Rodriguez"),

       (5, "Kunal", "Singh", "Account Manager", null),

       (6, "Malia", "Brown", "Accountant", "Kunal Singh"),

       (7, "Sarah", "Lourd", "Legal Team Lead", null),

       (8, "Tom", "Allen", "Lawyer", "Sarah Lourd");

