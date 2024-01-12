SELECT *
FROM departments
INNER JOIN roles
ON departments.id = roles.department_id
INNER JOIN employees
ON roles.id = employees.id;