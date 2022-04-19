-- SELECT title, departments.name AS department, salary
-- FROM roles
-- JOIN departments ON roles.department_id = departments.id;

SELECT e.id, e.first_name, e.last_name, roles.title, departments.name AS department, 
roles.salary, CONCAT(m.first_name, ' ' ,  m.last_name) AS manager
FROM employees e LEFT JOIN employees m ON e.manager_id = m.id
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;
-- SELECT
--   favorite_books.book_name AS name, book_prices.price AS price
-- FROM favorite_books
-- JOIN book_prices ON favorite_books.book_price = book_prices.id;