INSERT INTO departments(name)
VALUES 
('Engineering'),
('Marketing'),
('Human Resources');

INSERT INTO roles(title, department_id, salary)
VALUES
('Software Engineer', 1, 120000),
('Software Engineer Manager', 1, 150000),
('Marketing Coordinator', 2, 80000),
('Marketing Manager', 2, 120000),
('Human Resource Manager', 3, 100000),
('Human Resource Assistant', 3, 50000);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('Sarah', 'Nam', 2, NULL),
('Cindy', 'Lo', 1, 1),
('Emily', 'Tso', 4, NULL),
('Christine', 'Kim', 3, 3);