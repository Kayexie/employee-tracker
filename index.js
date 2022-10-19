let inquirer = require ('inquirer');
let cTable = require ('console.table');
let mysql = require ('mysql2');

//Connect to employee_db;
let employee_db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Oneway0725@',
        database: 'employee_db'     
    },
    console.log(`Connect to the movie_db database.`)
)

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
    const {employeeTracker} = response;
    console.log(employeeTracker);
    switch(employeeTracker) {
        case 'View all department':
        console.log("1")
        break;
        case 'Add a department':
            console.log("2")
        break;
        case 'View all roles':
            console.log("3")
        break;
        case 'Add a role':
            console.log("4")
        break;
        case 'View all employees':
            console.log("5")
        break;
        case 'Add an employee':
            console.log("6")
        break;
        case 'Update an employee role':
            console.log("7")
        break;
        case 'Exist':
            console.log("8")
        break;
    }
 })