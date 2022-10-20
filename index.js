let inquirer = require ('inquirer');
let cTable = require ('console.table');
let mysql = require ('mysql2');

//Connect to employee_db;
let employee_db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Oneway0725@',
        database: 'employee_db',
    },
    console.log(`Connect to the movie_db database.`)
)


//start the application; 
// startApplication();

// function startApplication() {
// inquirer
//  .prompt ([
//     {type: 'list',
//      name: 'employeeTracker',
//      message: 'What do you like to do?',
//      choices: ['View all department', 'Add a department', 'View all roles', 
//                'Add a role', 'View all employees', 'Add an employee', 
//                'Update an employee role', 'Exist']
//     }
//  ])
//  .then (response => {
//     const {employeeTracker} = response;
//     console.log(employeeTracker);
//     switch(employeeTracker) {
//         case 'View all department':
//            viewAllDepartment();
//         break
//         case 'Add a department':
//             console.log("2")
//             startApplication();
//         break;
//         case 'View all roles':
//             viewAllRoles();
//         break;
//         case 'Add a role':
//             console.log("4")
//         break;
//         case 'View all employees':
//             viewAllEmployee();
//         break;
//         case 'Add an employee':
//             console.log("6")
//         break;
//         case 'Update an employee role':
//             console.log("7")
//         break;
//         case 'Exist':
//             console.log("8")
//         break;
//     }
//  })};


 //  get the department table;
function viewAllDepartment(){
    employee_db.query(`select * from department`, (err, result)=>{
        if(err) {
            console.log(err);
        } return console.table(result)
    })};    

viewAllDepartment();

// get the roles table;
function viewAllRoles(){
    employee_db.query(`SELECT role.id, role.title, role.salary, department.name as department_name
    FROM role 
    JOIN department ON role.department_id = department.id;`, (err, result)=>{
        if(err) {
            console.log(err);
        } return console.table(result)
    })}; 

viewAllRoles();

//view all employee information;
function viewAllEmployee(){
    const selectEmployee = 
`SELECT 
    employOne.id as employee_id, 
    concat(employOne.first_name, ' ',employOne.last_name) as employee_name, 
    concat(employTwo.first_name, ' ',employTwo.last_name) as manager, 
    rd.title, 
    rd.name as department, 
    rd.salary
FROM employee as employOne
LEFT JOIN employee as employTwo 
ON employOne.manager_id = employTwo.id
LEFT JOIN
    (SELECT role.id, role.title, department.name, role.salary
    FROM role
    JOIN department ON department_id = department.id) as rd 
ON employOne.role_id = rd.id;`

    employee_db.query(selectEmployee, (err, result)=>{
        if(err) {
            console.log(err);
        } return console.table(result)
    })}; 

viewAllEmployee();

//add a new department;
function addDepartment() {
inquirer
  .prompt([ 
    {
      type:'input',
      name: 'department',
      message: 'Please enter the new department name here.'
    }
  ])
  .then((response)=> {
    console.log(response.department)
  })
}

addDepartment();

