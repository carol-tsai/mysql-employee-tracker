SELECT roles.id, title, departments.name AS department, salary
FROM roles
JOIN departments ON roles.department_id = departments.id
ORDER BY roles.id ASC;

-- SELECT e.id, e.first_name, e.last_name, roles.title, departments.name AS department, 
-- roles.salary, CONCAT(m.first_name, ' ' ,  m.last_name) AS manager
-- FROM employees e LEFT JOIN employees m ON e.manager_id = m.id
-- JOIN roles ON e.role_id = roles.id
-- JOIN departments ON roles.department_id = departments.id;
