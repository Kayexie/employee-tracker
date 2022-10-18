let inquirer = require ('inquirer');

inquirer
 .prompt ([
    {type: 'list',
     name: 'employeeTracker',
     message: 'What do you like to do?',
     choices: ['View all department', 'Add a department', 'View all roles', 
               'Add a role', 'View all employees', 'Add an employee', 
               'Update an employee role', 'Exist']
    }
 ])
 .then (response => {
    console.log(response.employeeTracker)
 })