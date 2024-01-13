SELECT *
FROM departments
INNER JOIN roles
ON departments.id = roles.department_id
INNER JOIN employees
ON roles.id = employees.id;


SELECT id AS department_id, name AS department_names 
FROM departments;

SELECT title AS job_title, id AS role_id, department_id, salary 
FROM roles;

SELECT e.id AS employee_id, e.first_name, e.last_name, e.manager_id, r.department_id, r.salary
FROM employees AS e
INNER JOIN roles AS r ON e.role_id = r.id;
