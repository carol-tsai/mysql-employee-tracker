INSERT INTO departments(name)
VALUES 
('Engineering'),
('Marketing'),
('Human Resources');

INSERT INTO roles(title, department_id, salary)
VALUES
('Software Engineer', 1, 120000),
('Marketing Coordinator', 2, 80000),
('Human Resource Manager', 3, 100000),
('Human Resource Assistant', 3, 50000);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('Sarah', 'Nam', 1, 1),
('Cindy', 'Lo', 2, 2),
('Emily', 'Tso', 3, 2),
('Christine', 'Kim', 4, 3);