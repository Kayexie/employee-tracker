-- SELECT *
-- FROM department;

-- SELECT role.id, role.title, role.salary, department.name as department_name
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- SELECT 
--     employOne.id as employee_id, 
--     concat(employOne.first_name, ' ',employOne.last_name) as employee_name, 
--     concat(employTwo.first_name, ' ',employTwo.last_name) as manager, 
--     rd.title, 
--     rd.name as department, 
--     rd.salary
-- FROM employee as employOne
-- LEFT JOIN employee as employTwo 
-- ON employOne.manager_id = employTwo.id
-- LEFT JOIN
--     (SELECT role.id, role.title, department.name, role.salary
--     FROM role
--     JOIN department ON department_id = department.id) as rd 
-- ON employOne.role_id = rd.id;

-- INSERT INTO department (name) VALUES ('Marketing');

UPDATE employee SET role_id = '' WHERE id =  ;
